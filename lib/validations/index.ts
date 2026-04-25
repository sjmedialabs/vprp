/**
 * Zod Validation Schemas
 * Centralized validation schemas for form handling and API validation
 */

import { z } from "zod";

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
  role: z.enum(["student", "cpo", "recruiter"]),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// ============================================================================
// PROFILE SCHEMAS
// ============================================================================

export const studentProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
  dateOfBirth: z.string().optional(),
  collegeId: z.string().uuid("Please select a college"),
  departmentId: z.string().uuid("Please select a department"),
  branch: z.string().min(1, "Please enter your branch"),
  year: z.number().min(1).max(5, "Year must be between 1 and 5"),
  cgpa: z.number().min(0).max(10, "CGPA must be between 0 and 10").optional(),
  targetRole: z.string().optional(),
  skills: z.array(z.string()).optional(),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
});

export const recruiterProfileSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
  companyWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]),
  industry: z.string().min(1, "Please select an industry"),
  companyDescription: z.string().max(1000, "Description must be under 1000 characters").optional(),
});

export const cpoProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  collegeId: z.string().uuid("Please select a college"),
  departmentId: z.string().uuid("Please select a department").optional(),
});

// ============================================================================
// JOB SCHEMAS
// ============================================================================

export const jobPostingSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(20, "Requirements must be at least 20 characters"),
  responsibilities: z.string().min(20, "Responsibilities must be at least 20 characters"),
  location: z.string().min(2, "Please enter a location"),
  locationType: z.enum(["onsite", "remote", "hybrid"]),
  employmentType: z.enum(["full_time", "part_time", "internship", "contract"]),
  experienceLevel: z.enum(["entry", "mid", "senior", "lead"]),
  salaryMin: z.number().min(0, "Salary must be positive").optional(),
  salaryMax: z.number().min(0, "Salary must be positive").optional(),
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
  cutoffScore: z.number().min(0).max(100, "Cutoff score must be between 0 and 100").optional(),
  deadline: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const jobApplicationSchema = z.object({
  jobId: z.string().uuid("Invalid job ID"),
  coverLetter: z.string().max(2000, "Cover letter must be under 2000 characters").optional(),
  resumeUrl: z.string().url("Please upload a valid resume").optional(),
  expectedSalary: z.number().min(0, "Expected salary must be positive").optional(),
  noticePeriod: z.string().optional(),
  availableFrom: z.string().optional(),
});

// ============================================================================
// ASSESSMENT SCHEMAS
// ============================================================================

export const assessmentSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
  type: z.enum(["aptitude", "technical", "coding", "personality", "communication"]),
  duration: z.number().min(5, "Duration must be at least 5 minutes"),
  totalQuestions: z.number().min(1, "Must have at least 1 question"),
  passingScore: z.number().min(0).max(100, "Passing score must be between 0 and 100"),
  difficulty: z.enum(["easy", "medium", "hard", "mixed"]),
  isProctored: z.boolean().default(false),
  shuffleQuestions: z.boolean().default(true),
  showResults: z.boolean().default(true),
});

export const questionSchema = z.object({
  text: z.string().min(10, "Question must be at least 10 characters"),
  type: z.enum(["mcq", "multiple_select", "true_false", "short_answer", "coding"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topic: z.string().min(1, "Please select a topic"),
  points: z.number().min(1, "Points must be at least 1"),
  options: z.array(z.object({
    text: z.string(),
    isCorrect: z.boolean(),
  })).optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().optional(),
  timeLimit: z.number().min(0).optional(),
});

export const attemptAnswerSchema = z.object({
  questionId: z.string().uuid(),
  response: z.string(),
  timeTaken: z.number().min(0),
});

// ============================================================================
// COLLEGE SCHEMAS
// ============================================================================

export const collegeSchema = z.object({
  name: z.string().min(5, "College name must be at least 5 characters"),
  code: z.string().min(2, "College code must be at least 2 characters"),
  location: z.string().min(2, "Please enter a location"),
  city: z.string().min(2, "Please enter a city"),
  state: z.string().min(2, "Please enter a state"),
  country: z.string().default("India"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  accreditation: z.string().optional(),
  establishedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  type: z.enum(["government", "private", "autonomous", "deemed"]),
});

export const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
  code: z.string().min(2, "Department code must be at least 2 characters"),
  collegeId: z.string().uuid("Please select a college"),
  hodName: z.string().optional(),
  hodEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

// ============================================================================
// PAYMENT SCHEMAS
// ============================================================================

export const createOrderSchema = z.object({
  planId: z.string().uuid("Invalid plan ID"),
  amount: z.number().min(1, "Amount must be positive"),
  currency: z.string().default("INR"),
  couponCode: z.string().optional(),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

// ============================================================================
// SUBSCRIPTION SCHEMAS
// ============================================================================

export const subscriptionSchema = z.object({
  userId: z.string().uuid(),
  planId: z.string().uuid(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["active", "inactive", "cancelled", "expired"]),
});

// ============================================================================
// PROJECT SCHEMAS (for Skill Passport)
// ============================================================================

export const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
  projectUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isOngoing: z.boolean().default(false),
});

// ============================================================================
// NOTIFICATION SCHEMAS
// ============================================================================

export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
  jobAlerts: z.boolean().default(true),
  assessmentReminders: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

// ============================================================================
// SEARCH & FILTER SCHEMAS
// ============================================================================

export const searchSchema = z.object({
  query: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const jobFilterSchema = searchSchema.extend({
  location: z.string().optional(),
  employmentType: z.array(z.string()).optional(),
  experienceLevel: z.array(z.string()).optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  skills: z.array(z.string()).optional(),
  companyId: z.string().uuid().optional(),
});

export const studentFilterSchema = searchSchema.extend({
  collegeId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  year: z.number().min(1).max(5).optional(),
  cgpaMin: z.number().min(0).max(10).optional(),
  skills: z.array(z.string()).optional(),
  isPlaced: z.boolean().optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
export type RecruiterProfileInput = z.infer<typeof recruiterProfileSchema>;
export type CpoProfileInput = z.infer<typeof cpoProfileSchema>;
export type JobPostingInput = z.infer<typeof jobPostingSchema>;
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
export type AssessmentInput = z.infer<typeof assessmentSchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
export type AttemptAnswerInput = z.infer<typeof attemptAnswerSchema>;
export type CollegeInput = z.infer<typeof collegeSchema>;
export type DepartmentInput = z.infer<typeof departmentSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type NotificationPreferencesInput = z.infer<typeof notificationPreferencesSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type JobFilterInput = z.infer<typeof jobFilterSchema>;
export type StudentFilterInput = z.infer<typeof studentFilterSchema>;
