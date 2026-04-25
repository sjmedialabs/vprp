# VPRP - Virtual Placement Readiness Platform

## Project Structure

```
/app
  /(auth)
    /login                    # Route-group login alias
    /register                 # Route-group register alias
  /(student)
    /student/dashboard        # Student dashboard shell placeholder
  /(cpo)
    /cpo/dashboard            # CPO dashboard shell placeholder
  /(recruiter)
    /recruiter/dashboard      # Recruiter dashboard shell placeholder
  /(admin)
    /admin/dashboard          # Admin dashboard shell placeholder
  /auth
    /login                    # Auth module login page
    /signup                   # Auth module register page
  /dashboard
    /student                  # Student dashboard & features
    /cpo                      # Placement Officer dashboard
    /recruiter                # Recruiter dashboard
    /admin                    # Super Admin dashboard
  /api
    /auth/*                   # Authentication endpoints
    /users                    # User management
    /tests                    # Assessment/test management
    /attempts                 # Test attempts
    /rankings                 # Student rankings
    /passport                 # Skill passport
    /recruiter                # Recruiter endpoints
    /payments/*               # Razorpay integration
    /notifications            # Notification system
    /webhooks/razorpay        # Payment webhooks

/components
  /layout                     # Dashboard shell, sidebar, header
  /providers                  # React Query provider
  /ui/*                       # shadcn/ui components

/modules
  /auth                       # Authentication module
  /practice                   # Domain placeholder module
  /assessment                 # Domain placeholder module
  /ranking                    # Domain placeholder module
  /passport                   # Domain placeholder module
  /student                    # Student features (practice, assessment, ranking, passport)
  /recruiter                  # Recruiter features
  /admin                      # Admin features
  /analytics                  # Shared analytics components

/lib
  /supabase                   # Supabase client (browser, server, middleware)
  /razorpay                   # Razorpay configuration & server utils
  /mailchimp                  # Mailchimp service
  /auth                       # Auth utilities
  /validations                # Zod schemas
  /api-response.ts            # Standardized API responses

/services                     # API service functions
/supabase                     # SQL schema + RLS/storage placeholders
/hooks                        # Custom React hooks
/types                        # TypeScript type definitions
/config                       # Application configuration
/scripts                      # Database migrations
```

## Tech Stack

- **Frontend**: Next.js 16 (App Router, TypeScript)
- **Backend**: Supabase (Auth + Database + Storage)
- **Database**: PostgreSQL (via Supabase)
- **Payments**: Razorpay (India)
- **Email/Marketing**: Mailchimp
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form + Zod
- **UI Components**: shadcn/ui

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Mailchimp
MAILCHIMP_API_KEY=
MAILCHIMP_SERVER_PREFIX=
MAILCHIMP_LIST_ID=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Database Setup

Run the baseline schema in your Supabase SQL editor:
- `supabase/schema.sql`

### 3. Run Development Server

```bash
npm install
npm run dev
```

## Roles

1. **Student** - Take assessments, apply for jobs, build skill passport
2. **CPO (College Placement Officer)** - Manage students, coordinate with recruiters
3. **Recruiter** - Post jobs, review applications, hire candidates
4. **Admin/Super Admin** - Platform management, user administration

## API Response Format

All API routes return:
```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

Sample placeholder route:

```ts
import { notImplementedResponse } from "@/lib/api-response";

export async function GET() {
  return notImplementedResponse();
}
```

## Next Steps (Implementation)

1. Connect Supabase integration
2. Implement authentication flows
3. Build assessment engine with proctoring
4. Create job application workflow
5. Implement Razorpay checkout
6. Set up Mailchimp email campaigns
7. Build analytics dashboards
