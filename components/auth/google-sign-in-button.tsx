'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '@/lib/supabase/auth'

function isSupabaseBrowserReady() {
  return !!(
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false)

  async function onClick() {
    if (!isSupabaseBrowserReady()) {
      toast.error('Supabase is not configured for OAuth.')
      return
    }
    setLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Redirecting…' : 'Continue with Google'}
    </Button>
  )
}
