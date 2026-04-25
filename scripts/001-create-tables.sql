-- VPRP Database Schema
-- Virtual Placement Readiness Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- ENUMS
-- =====================

CREATE TYPE user_role AS ENUM ('student', 'cpo', 'recruiter', 'super_admin');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'expired', 'trial');
CREATE TYPE placement_status AS ENUM ('placed', 'not_placed', 'in_progress');
CREATE TYPE job_status AS ENUM ('draft', 'active', 'closed', 'expired');
CREATE TYPE application_status AS ENUM ('pending', 'shortlisted', 'interviewed', 'selected', 'rejected');
CREATE TYPE assessment_type AS ENUM ('aptitude', 'technical', 'soft_skills', 'mock_interview');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- =====================
-- CORE TABLES
-- =====================

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Colleges table
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'India',
  pincode VARCHAR(10),
  website VARCHAR(255),
  logo_url TEXT,
  subscription_status subscription_status DEFAULT 'inactive',
  subscription_plan_id UUID,
  subscription_expires_at TIMESTAMPTZ,
  max_students INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departments table
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ROLE-SPECIFIC PROFILES
-- =====================

-- Student profiles
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  enrollment_number VARCHAR(50),
  batch_year INTEGER,
  graduation_year INTEGER,
  cgpa DECIMAL(4,2),
  resume_url TEXT,
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  portfolio_url VARCHAR(255),
  skills TEXT[], -- Array of skills
  placement_status placement_status DEFAULT 'not_placed',
  is_eligible_for_placement BOOLEAN DEFAULT true,
  profile_completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CPO (College Placement Officer) profiles
CREATE TABLE cpo_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  designation VARCHAR(100),
  department VARCHAR(100),
  employee_id VARCHAR(50),
  is_primary_cpo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recruiter profiles
CREATE TABLE recruiter_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID,
  designation VARCHAR(100),
  department VARCHAR(100),
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Super Admin profiles
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- COMPANY & JOBS
-- =====================

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url TEXT,
  website VARCHAR(255),
  industry VARCHAR(100),
  company_size VARCHAR(50),
  headquarters VARCHAR(255),
  founded_year INTEGER,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job postings
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  recruiter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,
  responsibilities TEXT,
  location VARCHAR(255),
  job_type VARCHAR(50), -- full-time, part-time, internship
  experience_required VARCHAR(100),
  salary_min DECIMAL(12,2),
  salary_max DECIMAL(12,2),
  skills_required TEXT[],
  eligibility_criteria JSONB,
  application_deadline TIMESTAMPTZ,
  status job_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job applications
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status application_status DEFAULT 'pending',
  resume_url TEXT,
  cover_letter TEXT,
  recruiter_notes TEXT,
  interview_scheduled_at TIMESTAMPTZ,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, student_id)
);

-- College-Company partnerships
CREATE TABLE college_company_partnerships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  partnership_type VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(college_id, company_id)
);

-- =====================
-- ASSESSMENTS & TRAINING
-- =====================

-- Assessment categories
CREATE TABLE assessment_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type assessment_type NOT NULL,
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessments
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES assessment_categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INTEGER,
  total_questions INTEGER,
  passing_score INTEGER,
  difficulty_level VARCHAR(20),
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessment questions
CREATE TABLE assessment_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50), -- mcq, coding, subjective
  options JSONB, -- for MCQ
  correct_answer TEXT,
  explanation TEXT,
  marks INTEGER DEFAULT 1,
  difficulty VARCHAR(20),
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student assessment attempts
CREATE TABLE student_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  score INTEGER,
  total_marks INTEGER,
  percentage DECIMAL(5,2),
  time_taken_minutes INTEGER,
  answers JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  is_passed BOOLEAN
);

-- Training modules
CREATE TABLE training_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  content_type VARCHAR(50), -- video, article, interactive
  content_url TEXT,
  duration_minutes INTEGER,
  is_premium BOOLEAN DEFAULT false,
  order_index INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student training progress
CREATE TABLE student_training_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES training_modules(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, module_id)
);

-- =====================
-- MOCK INTERVIEWS
-- =====================

-- Mock interview sessions
CREATE TABLE mock_interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  interviewer_id UUID REFERENCES users(id), -- Can be CPO or AI
  interview_type VARCHAR(50), -- technical, hr, behavioral
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  status VARCHAR(50) DEFAULT 'scheduled',
  meeting_link TEXT,
  recording_url TEXT,
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mock interview feedback
CREATE TABLE mock_interview_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interview_id UUID NOT NULL REFERENCES mock_interviews(id) ON DELETE CASCADE,
  overall_score INTEGER,
  communication_score INTEGER,
  technical_score INTEGER,
  confidence_score INTEGER,
  strengths TEXT,
  areas_of_improvement TEXT,
  detailed_feedback TEXT,
  recommendations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SUBSCRIPTIONS & PAYMENTS
-- =====================

-- Subscription plans
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  plan_type VARCHAR(50), -- college, individual
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  duration_months INTEGER,
  max_students INTEGER,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments (Razorpay integration)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  plan_id UUID REFERENCES subscription_plans(id),
  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  razorpay_signature VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  status payment_status DEFAULT 'pending',
  payment_method VARCHAR(50),
  receipt_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- NOTIFICATIONS & COMMUNICATIONS
-- =====================

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email campaigns (Mailchimp integration)
CREATE TABLE email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT,
  template_id VARCHAR(100),
  mailchimp_campaign_id VARCHAR(100),
  target_audience JSONB, -- role, college, etc.
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status VARCHAR(50) DEFAULT 'draft',
  stats JSONB, -- open rate, click rate, etc.
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ANALYTICS & REPORTS
-- =====================

-- Placement records
CREATE TABLE placement_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_postings(id),
  college_id UUID REFERENCES colleges(id),
  package_offered DECIMAL(12,2),
  joining_date DATE,
  offer_letter_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity logs
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INDEXES
-- =====================

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_student_profiles_college ON student_profiles(college_id);
CREATE INDEX idx_student_profiles_placement_status ON student_profiles(placement_status);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_company ON job_postings(company_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id, created_at);

-- =====================
-- ROW LEVEL SECURITY (RLS)
-- =====================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cpo_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiter_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Note: RLS policies should be created based on specific requirements
-- Example policies are commented below for reference

-- CREATE POLICY "Users can view own profile" ON users
--   FOR SELECT USING (auth.uid() = id);

-- CREATE POLICY "Students can view own applications" ON job_applications
--   FOR SELECT USING (auth.uid() = student_id);
