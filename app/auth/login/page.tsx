import { Suspense } from 'react'
import { LoginAuthCard } from '@/components/auth/login-auth-card'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Card className="w-full">
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            Loading sign-in…
          </CardContent>
        </Card>
      }
    >
      <LoginAuthCard />
    </Suspense>
  )
}
