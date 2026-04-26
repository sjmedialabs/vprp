'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

async function fetchPostAuthRedirect(): Promise<string> {
  const res = await fetch('/api/auth/me')
  const json = (await res.json()) as {
    success?: boolean
    data?: { redirectTo?: string }
  }
  if (!json.success || !json.data?.redirectTo) {
    return '/dashboard/student'
  }
  return json.data.redirectTo
}

export function PasswordSignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Email and password are required.')
      return
    }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) {
        toast.error(error.message)
        return
      }
      const redirect = searchParams.get('redirect')
      if (redirect && redirect.startsWith('/')) {
        router.push(redirect)
      } else {
        router.push(await fetchPostAuthRedirect())
      }
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pwd-email">Email</Label>
        <Input
          id="pwd-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pwd-password">Password</Label>
        <Input
          id="pwd-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
