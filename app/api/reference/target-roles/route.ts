import { createClient } from '@/lib/supabase/server'
import { successResponse } from '@/lib/api-response'

const FALLBACK = [
  { id: 'swe', label: 'Software Engineer' },
  { id: 'data', label: 'Data Engineer / Analyst' },
  { id: 'pm', label: 'Product Manager' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'core', label: 'Core / Non-IT' },
]

/** Target roles from `target_roles` when available; otherwise static fallback. */
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('target_roles').select('id,label').order('label')

  if (error || !data?.length) {
    if (error) {
      console.warn('target_roles fetch:', error.message)
    }
    return successResponse(FALLBACK)
  }

  return successResponse(data)
}
