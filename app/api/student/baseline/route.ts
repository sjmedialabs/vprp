import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { errorResponse, successResponse, unauthorizedResponse } from '@/lib/api-response'

/** Accepts baseline MCQ answers, computes a simple readiness score, stores on profile (MVP). */
export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return unauthorizedResponse()
  }

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()
  if (!existingProfile) {
    const ins = await supabase.from('profiles').insert({ user_id: user.id })
    if (ins.error) {
      return errorResponse(ins.error.message, 400)
    }
  }

  let body: { answers?: Record<string, string> }
  try {
    body = await request.json()
  } catch {
    return errorResponse('Invalid JSON', 400)
  }

  const answers = body.answers ?? {}
  const correct: Record<string, string> = {
    q1: 'B',
    q2: 'B',
    q3: 'C',
    q4: 'A',
    q5: 'B',
  }
  let score = 0
  for (const k of Object.keys(correct)) {
    if (answers[k] === correct[k]) score += 1
  }
  const readiness = Math.round((score / Object.keys(correct).length) * 100)

  const admin = createAdminClient()
  if (admin) {
    await admin
      .from('profiles')
      .update({
        readiness_score: readiness,
        baseline_completed_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
  } else {
    const { error } = await supabase
      .from('profiles')
      .update({
        readiness_score: readiness,
        baseline_completed_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
    if (error) {
      return errorResponse(error.message, 400)
    }
  }

  return successResponse({ readiness_score: readiness, correct_count: score })
}
