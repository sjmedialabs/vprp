'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

type College = { id: string; name: string; location: string | null }
type Department = { id: string; name: string; college_id: string }
type Company = { id: string; name: string }
type TargetRole = { id: string; label: string }

async function parseApi<T>(res: Response): Promise<T> {
  const json = (await res.json()) as { success?: boolean; data?: T; error?: string }
  if (!res.ok || !json.success) {
    throw new Error(json.error ?? 'Request failed')
  }
  return json.data as T
}

export function StudentOnboardingForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [colleges, setColleges] = useState<College[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [roles, setRoles] = useState<TargetRole[]>([])
  const [fullName, setFullName] = useState('')
  const [collegeId, setCollegeId] = useState<string>('')
  const [branch, setBranch] = useState<string>('')
  const [year, setYear] = useState<string>('4')
  const [targetRole, setTargetRole] = useState<string>('')
  const [selectedCompanies, setSelectedCompanies] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [cRes, coRes, rRes, pRes] = await Promise.all([
          fetch('/api/reference/colleges'),
          fetch('/api/reference/companies'),
          fetch('/api/reference/target-roles'),
          fetch('/api/student/profile'),
        ])
        const c = await parseApi<College[]>(cRes)
        const co = await parseApi<Company[]>(coRes)
        const r = await parseApi<TargetRole[]>(rRes)
        const prof = await parseApi<{
          profile: {
            full_name?: string | null
            college_id?: string | null
            branch?: string | null
            year?: number | null
            target_role?: string | null
            target_companies?: string[] | null
          } | null
        }>(pRes)
        if (cancelled) return
        setColleges(c)
        setCompanies(co)
        setRoles(r)
        const p = prof.profile
        if (p?.full_name) setFullName(p.full_name)
        if (p?.college_id) setCollegeId(p.college_id)
        if (p?.branch) setBranch(p.branch)
        if (p?.year != null) setYear(String(p.year))
        if (p?.target_role) setTargetRole(p.target_role)
        if (Array.isArray(p?.target_companies)) {
          const map: Record<string, boolean> = {}
          for (const id of p.target_companies) {
            map[id] = true
          }
          setSelectedCompanies(map)
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed to load form data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!collegeId) {
      setDepartments([])
      setBranch('')
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(
          `/api/reference/departments?college_id=${encodeURIComponent(collegeId)}`
        )
        const list = await parseApi<Department[]>(res)
        if (!cancelled) {
          setDepartments(list)
          if (branch && !list.some((d) => d.name === branch)) {
            setBranch('')
          }
        }
      } catch {
        if (!cancelled) {
          setDepartments([])
          toast.error('Could not load departments for this college.')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [collegeId])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName.trim()) {
      toast.error('Full name is required.')
      return
    }
    if (!collegeId) {
      toast.error('Select your college.')
      return
    }
    if (!branch) {
      toast.error('Select your branch.')
      return
    }
    if (!year) {
      toast.error('Select your year of study.')
      return
    }
    if (!targetRole) {
      toast.error('Select a target role.')
      return
    }

    const companyIds = Object.entries(selectedCompanies)
      .filter(([, v]) => v)
      .map(([k]) => k)

    setSaving(true)
    try {
      const res = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          college_id: collegeId,
          branch,
          year: Number(year),
          target_role: targetRole,
          target_companies: companyIds,
          onboarding_complete: true,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        toast.error(json.error ?? 'Could not save profile.')
        return
      }
      toast.success('Profile saved.')
      router.push('/dashboard/student/baseline')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ob-name">Full name</Label>
        <Input
          id="ob-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label>College</Label>
        <Select
          value={collegeId}
          onValueChange={(id) => {
            setCollegeId(id)
            setBranch('')
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select college" />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
                {c.location ? ` — ${c.location}` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Branch</Label>
        <Select value={branch} onValueChange={setBranch} disabled={!collegeId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={collegeId ? 'Select branch' : 'Pick a college first'} />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d.id} value={d.name}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Year of study</Label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1st year</SelectItem>
            <SelectItem value="2">2nd year</SelectItem>
            <SelectItem value="3">3rd year</SelectItem>
            <SelectItem value="4">Final year (default)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Target role</Label>
        <Select value={targetRole} onValueChange={setTargetRole}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select target role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r.id} value={r.label}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Target companies (optional)</Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {companies.map((c) => (
            <label
              key={c.id}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm"
            >
              <Checkbox
                checked={!!selectedCompanies[c.id]}
                onCheckedChange={(v) =>
                  setSelectedCompanies((prev) => ({ ...prev, [c.id]: v === true }))
                }
              />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? 'Saving…' : 'Save and continue to baseline test'}
      </Button>
    </form>
  )
}
