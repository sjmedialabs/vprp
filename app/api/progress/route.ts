import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { getUserProgress, upsertProgress } from "@/services/learning/progress.service";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) return errorResponse("userId is required");

  const data = await getUserProgress(userId);
  return successResponse(data, "Progress fetched");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { user_id, topic_id, completion } = body as {
    user_id?: string;
    topic_id?: string;
    completion?: number;
  };

  if (!user_id || !topic_id || completion === undefined) {
    return errorResponse("user_id, topic_id and completion are required");
  }

  const { data, error } = await upsertProgress({ user_id, topic_id, completion });
  if (error) return errorResponse(error.message, 500);
  return successResponse(data, "Progress updated");
}
