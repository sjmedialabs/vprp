import { createClient } from '@/lib/supabase/server'
import { errorResponse, successResponse } from '@/lib/api-response'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const collegeId = searchParams.get('college_id')
  if (!collegeId) {
    return errorResponse('college_id query parameter is required', 400)
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('departments')
    .select('id,name,college_id')
    .eq('college_id', collegeId)
    .order('name', { ascending: true })

  if (error) {
    return errorResponse(error.message, 500)
  }
  return successResponse(data ?? [])
}
