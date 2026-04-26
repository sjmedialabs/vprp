'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OtpAuthPanel } from '@/components/auth/otp-auth-panel'

export function SignupAuthCard() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Join VPRP with email or mobile OTP</CardDescription>
      </CardHeader>
      <CardContent>
        <OtpAuthPanel
          mode="signup"
          demoSlot={
            <div className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                Without Supabase env vars you can still explore the product with demo dashboards.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <Link href="/dashboard/student">Student</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <Link href="/dashboard/cpo">CPO</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <Link href="/dashboard/recruiter">Recruiter</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <Link href="/dashboard/admin">Admin</Link>
                </Button>
              </div>
            </div>
          }
        />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
