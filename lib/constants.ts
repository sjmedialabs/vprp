// VPRP Application Constants

export const APP_NAME = 'VPRP'
export const APP_FULL_NAME = 'Virtual Placement Readiness Platform'
export const APP_DESCRIPTION = 'A comprehensive platform connecting students, colleges, and recruiters for seamless placement preparation and recruitment.'

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  CPO: 'cpo',
  RECRUITER: 'recruiter',
  SUPER_ADMIN: 'super_admin',
} as const

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  COLLEGE: {
    STARTER: {
      id: 'college_starter',
      name: 'College Starter',
      price: 49999,
      maxStudents: 100,
      features: ['Up to 100 students', 'Basic analytics', 'Email support'],
    },
    GROWTH: {
      id: 'college_growth',
      name: 'College Growth',
      price: 99999,
      maxStudents: 500,
      features: ['Up to 500 students', 'Advanced analytics', 'Priority support', 'Custom branding'],
    },
    ENTERPRISE: {
      id: 'college_enterprise',
      name: 'College Enterprise',
      price: 199999,
      maxStudents: -1, // Unlimited
      features: ['Unlimited students', 'Full analytics suite', 'Dedicated support', 'API access', 'Custom integrations'],
    },
  },
  INDIVIDUAL: {
    BASIC: {
      id: 'individual_basic',
      name: 'Basic',
      price: 999,
      features: ['Basic assessments', 'Resume builder', 'Job applications'],
    },
    PREMIUM: {
      id: 'individual_premium',
      name: 'Premium',
      price: 2499,
      features: ['All assessments', 'AI mock interviews', 'Priority support', 'Personalized coaching'],
    },
    PRO: {
      id: 'individual_pro',
      name: 'Pro',
      price: 4999,
      features: ['Everything in Premium', '1-on-1 mentoring', 'Exclusive job postings', 'Career counseling'],
    },
  },
} as const

// Assessment Types
export const ASSESSMENT_TYPES = {
  APTITUDE: 'aptitude',
  TECHNICAL: 'technical',
  SOFT_SKILLS: 'soft_skills',
  MOCK_INTERVIEW: 'mock_interview',
} as const

// Job Types
export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship',
  CONTRACT: 'contract',
} as const

// Application Status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  SHORTLISTED: 'shortlisted',
  INTERVIEWED: 'interviewed',
  SELECTED: 'selected',
  REJECTED: 'rejected',
} as const

// Navigation Items per Role
export const NAV_ITEMS = {
  student: [
    { label: 'Dashboard', href: '/dashboard/student' },
    { label: 'Profile', href: '/dashboard/student/profile' },
    { label: 'Assessments', href: '/dashboard/student/assessments' },
    { label: 'Jobs', href: '/dashboard/student/jobs' },
    { label: 'Mock Interviews', href: '/dashboard/student/mock-interviews' },
    { label: 'Training', href: '/dashboard/student/training' },
  ],
  cpo: [
    { label: 'Dashboard', href: '/dashboard/cpo' },
    { label: 'Students', href: '/dashboard/cpo/students' },
    { label: 'Companies', href: '/dashboard/cpo/companies' },
    { label: 'Analytics', href: '/dashboard/cpo/analytics' },
    { label: 'Settings', href: '/dashboard/cpo/settings' },
  ],
  recruiter: [
    { label: 'Dashboard', href: '/dashboard/recruiter' },
    { label: 'Jobs', href: '/dashboard/recruiter/jobs' },
    { label: 'Applications', href: '/dashboard/recruiter/applications' },
    { label: 'Colleges', href: '/dashboard/recruiter/colleges' },
    { label: 'Company', href: '/dashboard/recruiter/company' },
  ],
  super_admin: [
    { label: 'Dashboard', href: '/dashboard/admin' },
    { label: 'Users', href: '/dashboard/admin/users' },
    { label: 'Colleges', href: '/dashboard/admin/colleges' },
    { label: 'Companies', href: '/dashboard/admin/companies' },
    { label: 'Subscriptions', href: '/dashboard/admin/subscriptions' },
    { label: 'Assessments', href: '/dashboard/admin/assessments' },
    { label: 'Settings', href: '/dashboard/admin/settings' },
  ],
} as const
