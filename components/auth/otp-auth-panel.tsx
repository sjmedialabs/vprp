'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { SignupRole } from '@/lib/auth/dashboard-path'

type Channel = 'email' | 'phone'
type Step = 'contact' | 'otp' | 'profile'

export type OtpAuthMode = 'login' | 'signup'

function isSupabaseBrowserReady() {
  return !!(
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

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

export function OtpAuthPanel({
  mode,
  demoSlot,
}: {
  mode: OtpAuthMode
  /** Shown when Supabase env is not configured (demo mode). */
  demoSlot?: React.ReactNode
}) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('contact')
  const [channel, setChannel] = useState<Channel>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [fullName, setFullName] = useState('')
  const [profilePhone, setProfilePhone] = useState('')
  const [role, setRole] = useState<SignupRole>('student')
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [bootstrapping, setBootstrapping] = useState(false)

  const ready = isSupabaseBrowserReady()

  const contactValue = channel === 'email' ? email.trim() : phone.trim()

  async function sendOtp() {
    if (!ready) {
      toast.error('Supabase is not configured. Use demo access below.')
      return
    }
    if (channel === 'email' && !email.includes('@')) {
      toast.error('Enter a valid email address.')
      return
    }
    if (channel === 'phone' && phone.replace(/\D/g, '').length < 10) {
      toast.error('Enter a valid phone number (include country code, e.g. +91…).')
      return
    }

    setSending(true)
    try {
      const supabase = createClient()
      const shouldCreate = mode === 'signup'
      const res =
        channel === 'email'
          ? await supabase.auth.signInWithOtp({
              email: email.trim(),
              options: {
                shouldCreateUser: shouldCreate,
                emailRedirectTo: `${window.location.origin}/auth/callback`,
              },
            })
          : await supabase.auth.signInWithOtp({
              phone: phone.trim(),
              options: { shouldCreateUser: shouldCreate },
            })

      if (res.error) {
        toast.error(res.error.message)
        return
      }
      toast.success('OTP sent. Check your inbox or SMS.')
      setStep('otp')
    } finally {
      setSending(false)
    }
  }

  async function verifyAndContinue() {
    if (otp.length < 6) {
      toast.error('Enter the 6-digit code.')
      return
    }
    if (!ready) return

    setVerifying(true)
    try {
      const supabase = createClient()
      const res =
        channel === 'email'
          ? await supabase.auth.verifyOtp({
              email: email.trim(),
              token: otp,
              type: 'email',
            })
          : await supabase.auth.verifyOtp({
              phone: phone.trim(),
              token: otp,
              type: 'sms',
            })

      if (res.error) {
        toast.error(res.error.message)
        return
      }

      if (mode === 'signup') {
        setStep('profile')
        return
      }

      const dest = await fetchPostAuthRedirect()
      router.push(dest)
      router.refresh()
    } finally {
      setVerifying(false)
    }
  }

  async function completeSignup() {
    if (!fullName.trim()) {
      toast.error('Full name is required.')
      return
    }
    setBootstrapping(true)
    try {
      const boot = await fetch('/api/auth/bootstrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          full_name: fullName.trim(),
          phone: profilePhone.trim() || null,
        }),
      })
      const json = await boot.json()
      if (!boot.ok || !json.success) {
        toast.error(json.error ?? 'Could not finish signup.')
        return
      }
      const dest = await fetchPostAuthRedirect()
      router.push(dest)
      router.refresh()
    } finally {
      setBootstrapping(false)
    }
  }

  if (!ready) {
    return (
      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Email and SMS OTP require{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
          and{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
          in your environment.
        </p>
        {demoSlot}
      </div>
    )
  }

  if (step === 'contact') {
    return (
      <div className="space-y-4">
        <Tabs
          value={channel}
          onValueChange={(v) => setChannel(v as Channel)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="space-y-2 pt-2">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </TabsContent>
          <TabsContent value="phone" className="space-y-2 pt-2">
            <Label htmlFor="auth-phone">Phone (E.164)</Label>
            <Input
              id="auth-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+919876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              SMS OTP must be enabled for your Supabase project and region.
            </p>
          </TabsContent>
        </Tabs>
        <Button
          type="button"
          className="w-full"
          disabled={sending || !contactValue}
          onClick={sendOtp}
        >
          {sending ? 'Sending…' : 'Send OTP'}
        </Button>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Enter the code sent to{' '}
          <span className="font-medium text-foreground">
            {channel === 'email' ? email : phone}
          </span>
          .
        </p>
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          type="button"
          className="w-full"
          disabled={verifying || otp.length < 6}
          onClick={verifyAndContinue}
        >
          {verifying ? 'Verifying…' : 'Verify & continue'}
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('contact')}>
          Use a different {channel === 'email' ? 'email' : 'number'}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full-name">Full name</Label>
        <Input
          id="full-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-phone">Phone (optional)</Label>
        <Input
          id="profile-phone"
          value={profilePhone}
          onChange={(e) => setProfilePhone(e.target.value)}
          placeholder="+91…"
        />
      </div>
      <div className="space-y-2">
        <Label>I am a</Label>
        <Select value={role} onValueChange={(v) => setRole(v as SignupRole)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="cpo">College Placement Officer</SelectItem>
            <SelectItem value="recruiter">Recruiter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        className="w-full"
        disabled={bootstrapping}
        onClick={completeSignup}
      >
        {bootstrapping ? 'Creating account…' : 'Create account'}
      </Button>
    </div>
  )
}
