import { createClient } from '@/lib/supabase/server'
import { errorResponse, successResponse } from '@/lib/api-response'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('companies').select('id,name').order('name', { ascending: true })
  if (error) {
    return errorResponse(error.message, 500)
  }
  return successResponse(data ?? [])
}
