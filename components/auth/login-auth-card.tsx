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
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield } from 'lucide-react'
import { OtpAuthPanel } from '@/components/auth/otp-auth-panel'
import { PasswordSignInForm } from '@/components/auth/password-sign-in-form'
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button'

export function LoginAuthCard() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in to your VPRP account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="otp" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="otp">Email / mobile OTP</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="otp" className="mt-4 space-y-4">
            <OtpAuthPanel
              mode="login"
              demoSlot={
                <div className="w-full rounded-lg border bg-muted/50 p-4">
                  <p className="mb-3 text-center text-xs font-medium text-muted-foreground">
                    Quick Demo Access
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
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <PasswordSignInForm />
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            Or continue with
          </span>
        </div>

        <GoogleSignInButton />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Google uses Supabase OAuth; enable the provider in your Supabase project.
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
