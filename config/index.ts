/**
 * Application Configuration
 * Centralized configuration for the VPRP platform
 */

// Environment Configuration
export const config = {
  // App
  appName: "VPRP",
  appDescription: "Virtual Placement Readiness Platform",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },

  // Razorpay
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
  },

  // Mailchimp
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY || "",
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || "us1",
    listId: process.env.MAILCHIMP_LIST_ID || "",
  },

  // Feature Flags
  features: {
    enableGoogleAuth: false, // TODO: Enable when configured
    enableOtpLogin: true,
    enableProctoring: true,
    enableAiInterviews: true,
    enablePayments: true,
  },

  // Limits
  limits: {
    maxFileUploadSize: 10 * 1024 * 1024, // 10MB
    maxResumeSize: 5 * 1024 * 1024, // 5MB
    maxAssessmentDuration: 180, // 3 hours in minutes
    maxJobsPerRecruiter: 50,
    maxApplicationsPerStudent: 20,
  },
} as const;

// Navigation Configuration
export const navigation = {
  student: [
    { name: "Dashboard", href: "/dashboard/student" },
    { name: "Profile", href: "/dashboard/student/profile" },
    { name: "Assessments", href: "/dashboard/student/assessments" },
    { name: "Jobs", href: "/dashboard/student/jobs" },
    { name: "Mock Interviews", href: "/dashboard/student/mock-interviews" },
    { name: "Training", href: "/dashboard/student/training" },
  ],
  cpo: [
    { name: "Dashboard", href: "/dashboard/cpo" },
    { name: "Students", href: "/dashboard/cpo/students" },
    { name: "Companies", href: "/dashboard/cpo/companies" },
    { name: "Analytics", href: "/dashboard/cpo/analytics" },
    { name: "Settings", href: "/dashboard/cpo/settings" },
  ],
  recruiter: [
    { name: "Dashboard", href: "/dashboard/recruiter" },
    { name: "Jobs", href: "/dashboard/recruiter/jobs" },
    { name: "Applications", href: "/dashboard/recruiter/applications" },
    { name: "Colleges", href: "/dashboard/recruiter/colleges" },
    { name: "Company", href: "/dashboard/recruiter/company" },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Users", href: "/dashboard/admin/users" },
    { name: "Colleges", href: "/dashboard/admin/colleges" },
    { name: "Companies", href: "/dashboard/admin/companies" },
    { name: "Subscriptions", href: "/dashboard/admin/subscriptions" },
    { name: "Settings", href: "/dashboard/admin/settings" },
  ],
} as const;

// Subscription Plans
export const subscriptionPlans = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "Basic assessments",
      "Profile creation",
      "Job applications (5/month)",
    ],
  },
  professional: {
    name: "Professional",
    price: 150000, // 1,500 INR in paise
    features: [
      "Unlimited assessments",
      "AI mock interviews",
      "Skill passport",
      "Priority support",
      "Unlimited applications",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 250000, // 2,500 INR in paise
    features: [
      "Everything in Professional",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Analytics dashboard",
    ],
  },
} as const;

export type SubscriptionPlan = keyof typeof subscriptionPlans;
