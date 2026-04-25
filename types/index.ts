// VPRP Type Definitions

// =====================
// ENUMS
// =====================

export type UserRole = 'student' | 'cpo' | 'recruiter' | 'admin' | 'super_admin'
export type SubscriptionStatus = 'active' | 'inactive' | 'expired' | 'trial'
export type PlacementStatus = 'placed' | 'not_placed' | 'in_progress'
export type JobStatus = 'draft' | 'active' | 'closed' | 'expired'
export type ApplicationStatus = 'pending' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected'
export type AssessmentType = 'aptitude' | 'technical' | 'soft_skills' | 'mock_interview'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

// =====================
// CORE TYPES
// =====================

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  role: UserRole
  avatar_url?: string
  is_active: boolean
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface College {
  id: string
  name: string
  code?: string
  address?: string
  city?: string
  state?: string
  country: string
  pincode?: string
  website?: string
  logo_url?: string
  subscription_status: SubscriptionStatus
  subscription_plan_id?: string
  subscription_expires_at?: string
  max_students: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  college_id: string
  name: string
  code?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// =====================
// ROLE-SPECIFIC PROFILES
// =====================

export interface StudentProfile {
  id: string
  user_id: string
  college_id?: string
  department_id?: string
  enrollment_number?: string
  batch_year?: number
  graduation_year?: number
  cgpa?: number
  resume_url?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  skills: string[]
  placement_status: PlacementStatus
  is_eligible_for_placement: boolean
  profile_completion_percentage: number
  created_at: string
  updated_at: string
  // Relations
  user?: User
  college?: College
  department?: Department
}

export interface CPOProfile {
  id: string
  user_id: string
  college_id: string
  designation?: string
  department?: string
  employee_id?: string
  is_primary_cpo: boolean
  created_at: string
  updated_at: string
  // Relations
  user?: User
  college?: College
}

export interface RecruiterProfile {
  id: string
  user_id: string
  company_id?: string
  designation?: string
  department?: string
  is_verified: boolean
  verified_at?: string
  verified_by?: string
  created_at: string
  updated_at: string
  // Relations
  user?: User
  company?: Company
}

export interface AdminProfile {
  id: string
  user_id: string
  permissions: Record<string, boolean>
  created_at: string
  updated_at: string
  // Relations
  user?: User
}

// =====================
// COMPANY & JOBS
// =====================

export interface Company {
  id: string
  name: string
  description?: string
  logo_url?: string
  website?: string
  industry?: string
  company_size?: string
  headquarters?: string
  founded_year?: number
  is_verified: boolean
  is_active: boolean
  created_by?: string
  created_at: string
  updated_at: string
}

export interface JobPosting {
  id: string
  company_id: string
  recruiter_id: string
  title: string
  description?: string
  requirements?: string
  responsibilities?: string
  location?: string
  job_type?: string
  experience_required?: string
  salary_min?: number
  salary_max?: number
  skills_required: string[]
  eligibility_criteria?: Record<string, unknown>
  application_deadline?: string
  status: JobStatus
  is_featured: boolean
  views_count: number
  applications_count: number
  created_at: string
  updated_at: string
  // Relations
  company?: Company
  recruiter?: User
}

export interface JobApplication {
  id: string
  job_id: string
  student_id: string
  status: ApplicationStatus
  resume_url?: string
  cover_letter?: string
  recruiter_notes?: string
  interview_scheduled_at?: string
  applied_at: string
  updated_at: string
  // Relations
  job?: JobPosting
  student?: User & { profile?: StudentProfile }
}

// =====================
// ASSESSMENTS & TRAINING
// =====================

export interface AssessmentCategory {
  id: string
  name: string
  description?: string
  type: AssessmentType
  icon?: string
  is_active: boolean
  created_at: string
}

export interface Assessment {
  id: string
  category_id: string
  title: string
  description?: string
  duration_minutes?: number
  total_questions?: number
  passing_score?: number
  difficulty_level?: string
  is_premium: boolean
  is_active: boolean
  created_by?: string
  created_at: string
  updated_at: string
  // Relations
  category?: AssessmentCategory
}

export interface AssessmentQuestion {
  id: string
  assessment_id: string
  question_text: string
  question_type?: string
  options?: Record<string, unknown>
  correct_answer?: string
  explanation?: string
  marks: number
  difficulty?: string
  order_index?: number
  created_at: string
}

export interface StudentAssessment {
  id: string
  student_id: string
  assessment_id: string
  score?: number
  total_marks?: number
  percentage?: number
  time_taken_minutes?: number
  answers?: Record<string, unknown>
  started_at: string
  completed_at?: string
  is_passed?: boolean
  // Relations
  assessment?: Assessment
}

export interface TrainingModule {
  id: string
  title: string
  description?: string
  category?: string
  content_type?: string
  content_url?: string
  duration_minutes?: number
  is_premium: boolean
  order_index?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface StudentTrainingProgress {
  id: string
  student_id: string
  module_id: string
  progress_percentage: number
  completed_at?: string
  last_accessed_at: string
  // Relations
  module?: TrainingModule
}

// =====================
// MOCK INTERVIEWS
// =====================

export interface MockInterview {
  id: string
  student_id: string
  interviewer_id?: string
  interview_type?: string
  scheduled_at?: string
  duration_minutes?: number
  status: string
  meeting_link?: string
  recording_url?: string
  ai_generated: boolean
  created_at: string
  updated_at: string
  // Relations
  student?: User
  interviewer?: User
  feedback?: MockInterviewFeedback
}

export interface MockInterviewFeedback {
  id: string
  interview_id: string
  overall_score?: number
  communication_score?: number
  technical_score?: number
  confidence_score?: number
  strengths?: string
  areas_of_improvement?: string
  detailed_feedback?: string
  recommendations?: string
  created_at: string
}

// =====================
// SUBSCRIPTIONS & PAYMENTS
// =====================

export interface SubscriptionPlan {
  id: string
  name: string
  description?: string
  plan_type?: string
  price: number
  currency: string
  duration_months?: number
  max_students?: number
  features?: Record<string, unknown>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  college_id?: string
  plan_id?: string
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  amount: number
  currency: string
  status: PaymentStatus
  payment_method?: string
  receipt_url?: string
  metadata?: Record<string, unknown>
  created_at: string
  updated_at: string
}

// =====================
// NOTIFICATIONS & COMMUNICATIONS
// =====================

export interface Notification {
  id: string
  user_id: string
  title: string
  message?: string
  type?: string
  is_read: boolean
  action_url?: string
  metadata?: Record<string, unknown>
  created_at: string
}

export interface EmailCampaign {
  id: string
  title: string
  subject: string
  content?: string
  template_id?: string
  mailchimp_campaign_id?: string
  target_audience?: Record<string, unknown>
  scheduled_at?: string
  sent_at?: string
  status: string
  stats?: Record<string, unknown>
  created_by?: string
  created_at: string
  updated_at: string
}

// =====================
// ANALYTICS & REPORTS
// =====================

export interface PlacementRecord {
  id: string
  student_id: string
  company_id: string
  job_id?: string
  college_id?: string
  package_offered?: number
  joining_date?: string
  offer_letter_url?: string
  is_verified: boolean
  verified_by?: string
  created_at: string
  // Relations
  student?: User
  company?: Company
  college?: College
}

export interface ActivityLog {
  id: string
  user_id?: string
  action: string
  entity_type?: string
  entity_id?: string
  details?: Record<string, unknown>
  ip_address?: string
  user_agent?: string
  created_at: string
}

// =====================
// API RESPONSE TYPES
// =====================

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// =====================
// AUTH TYPES
// =====================

export interface AuthSession {
  user: User
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface SignUpData {
  email: string
  password: string
  full_name: string
  role: UserRole
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}
