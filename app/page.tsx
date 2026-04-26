import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Building2,
  Briefcase,
  Shield,
  CheckCircle2,
  Users,
  BarChart3,
  BookOpen,
  Video,
  FileText,
  ArrowRight,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <span className="text-xl font-bold">VPRP</span>
              <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
                Virtual Placement Readiness Platform
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/40" />
        <div className="absolute inset-0">
          <Image
            src="/stock/hero-campus.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-accent/20" />
        </div>
        <div className="container relative mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              Trusted by 150+ Colleges Across India
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your Path to{" "}
              <span className="text-primary">Career Success</span> Starts Here
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              VPRP connects students, colleges, and recruiters on a unified
              platform for seamless placement preparation, skill assessment, and
              recruitment.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/practice">
                <Button size="lg" className="neon-border gap-2 bg-primary text-primary-foreground">
                  Start Practice
                </Button>
              </Link>
              <Link href="/auth/signup?role=student">
                <Button size="lg" className="gap-2">
                  <GraduationCap className="h-5 w-5" />
                  I&apos;m a Student
                </Button>
              </Link>
              <Link href="/auth/signup?role=cpo">
                <Button size="lg" variant="outline" className="gap-2">
                  <Building2 className="h-5 w-5" />
                  I&apos;m a College
                </Button>
              </Link>
              <Link href="/auth/signup?role=recruiter">
                <Button size="lg" variant="outline" className="gap-2">
                  <Briefcase className="h-5 w-5" />
                  I&apos;m a Recruiter
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Students", value: "50,000+" },
                { label: "Colleges", value: "150+" },
                { label: "Companies", value: "500+" },
                { label: "Placements", value: "25,000+" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/70 bg-card/80 px-4 py-3 shadow-sm">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-border/70 bg-card/90 p-3 shadow-xl shadow-primary/10">
              <Image
                src="/stock/hero-campus.jpg"
                alt="Students on campus using placement tools"
                width={1200}
                height={650}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/60 bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Platform Features</h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need for successful campus placements
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-sm">
            <Image
              src="/stock/features-analytics.jpg"
              alt="Students and mentors reviewing performance analytics"
              width={1400}
              height={520}
              className="h-52 w-full object-cover md:h-64"
            />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-card shadow-sm">
              <CardHeader>
                <GraduationCap className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>For Students</CardTitle>
                <CardDescription>Prepare for your dream job</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {[
                    "Aptitude & Technical Assessments",
                    "AI-Powered Mock Interviews",
                    "Skill Passport & Portfolio",
                    "Direct Job Applications",
                    "College & National Rankings",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader>
                <Building2 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>For Colleges</CardTitle>
                <CardDescription>Streamline placement operations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {[
                    "Student Management Dashboard",
                    "Recruiter Coordination",
                    "Placement Analytics & Reports",
                    "Training Module Management",
                    "Bulk Assessment Scheduling",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader>
                <Briefcase className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>For Recruiters</CardTitle>
                <CardDescription>Find the right talent</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {[
                    "Post Jobs & Internships",
                    "Filter by Verified Skills",
                    "Schedule Campus Visits",
                    "Track Application Pipeline",
                    "Access Skill Passports",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-gradient-to-b from-muted to-card shadow-sm">
              <CardHeader>
                <Shield className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Platform Benefits</CardTitle>
                <CardDescription>Why choose VPRP</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {[
                    "AI-Driven Assessments",
                    "Proctored Examinations",
                    "Real-Time Analytics",
                    "Secure & Scalable",
                    "24/7 Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-muted-foreground">
              Simple steps to placement success
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-sm">
            <Image
              src="/stock/how-it-works-team.jpg"
              alt="Team discussion for interview and placement preparation"
              width={1400}
              height={500}
              className="h-48 w-full object-cover md:h-60"
            />
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                icon: Users,
                title: "Sign Up",
                desc: "Create your account and complete your profile",
              },
              {
                step: "02",
                icon: BookOpen,
                title: "Learn & Practice",
                desc: "Access training modules and practice tests",
              },
              {
                step: "03",
                icon: FileText,
                title: "Take Assessments",
                desc: "Complete proctored assessments to build your profile",
              },
              {
                step: "04",
                icon: Briefcase,
                title: "Get Placed",
                desc: "Apply to jobs and attend interviews",
              },
            ].map((item, i) => (
              <div key={i} className="relative rounded-2xl border border-border/60 bg-card/80 p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl font-bold text-muted/30">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Dashboards */}
      <section className="border-t border-border/60 bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Explore Dashboards</h2>
            <p className="mt-2 text-muted-foreground">
              Preview our role-based dashboards
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                role: "Student",
                href: "/dashboard/student",
                icon: GraduationCap,
                desc: "Track assessments, apply to jobs, and monitor your progress",
                image: "/stock/dashboard-preview.jpg",
              },
              {
                role: "Placement Officer",
                href: "/dashboard/cpo",
                icon: Building2,
                desc: "Manage students, coordinate with recruiters, view analytics",
                image: "/stock/features-analytics.jpg",
              },
              {
                role: "Recruiter",
                href: "/dashboard/recruiter",
                icon: Briefcase,
                desc: "Post jobs, review applications, schedule interviews",
                image: "/stock/how-it-works-team.jpg",
              },
              {
                role: "Super Admin",
                href: "/dashboard/admin",
                icon: Shield,
                desc: "Platform management, user administration, revenue tracking",
                image: "/stock/hero-campus.jpg",
              },
            ].map((item) => (
              <Link key={item.role} href={item.href}>
                <Card className="h-full border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="overflow-hidden rounded-t-xl border-b border-border/60">
                    <Image
                      src={item.image}
                      alt={`${item.role} dashboard preview`}
                      width={700}
                      height={360}
                      className="h-36 w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <item.icon className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle className="flex items-center gap-2">
                      {item.role}
                      <ArrowRight className="h-4 w-4" />
                    </CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">What People Say</h2>
            <p className="mt-2 text-muted-foreground">
              Trusted by leading institutions and companies
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "VPRP has transformed our placement process. The analytics and student tracking features are invaluable.",
                name: "Dr. Sharma",
                role: "Placement Officer, IIT Delhi",
                image: "/stock/testimonial-1.jpg",
              },
              {
                quote:
                  "The skill passport feature helped me showcase my abilities to recruiters effectively. Got placed in my dream company!",
                name: "Rahul Kumar",
                role: "Student, NIT Trichy",
                image: "/stock/testimonial-2.jpg",
              },
              {
                quote:
                  "Finding verified, placement-ready candidates has never been easier. Highly recommend for campus hiring.",
                name: "Priya Singh",
                role: "HR Manager, TechCorp",
                image: "/stock/testimonial-3.jpg",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-border/70 shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-4 flex items-center gap-3 border-t pt-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/60 bg-gradient-to-r from-primary to-primary/85 py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Join thousands of students, colleges, and recruiters already using
            VPRP for successful placements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/70 bg-card/70 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">VPRP</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Virtual Placement Readiness Platform connecting students,
                colleges, and recruiters.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/signup?role=student" className="hover:text-foreground">
                    For Students
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup?role=cpo" className="hover:text-foreground">
                    For Colleges
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup?role=recruiter" className="hover:text-foreground">
                    For Recruiters
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/documentation" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api-reference" className="hover:text-foreground">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy-policy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="hover:text-foreground">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} VPRP - Virtual Placement Readiness
              Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
