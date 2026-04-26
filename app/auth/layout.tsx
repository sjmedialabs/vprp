import Link from "next/link";
import { Shield } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden w-1/2 bg-primary lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Link href="/" className="flex items-center gap-2 text-primary-foreground">
          <Shield className="h-8 w-8" />
          <span className="text-xl font-bold">VPRP</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground">
            Virtual Placement Readiness Platform
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Connecting students, colleges, and recruiters for seamless placement
            preparation and recruitment.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold text-primary-foreground">50K+</p>
              <p className="text-sm text-primary-foreground/70">Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-foreground">150+</p>
              <p className="text-sm text-primary-foreground/70">Colleges</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-foreground">500+</p>
              <p className="text-sm text-primary-foreground/70">Companies</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} VPRP. All rights reserved.
        </p>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex w-full items-center justify-center bg-background p-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2 lg:hidden"
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">VPRP</span>
          </Link>
          {children}
          <Toaster richColors closeButton />
        </div>
      </div>
    </div>
  );
}
