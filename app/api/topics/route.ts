import { NextRequest } from "next/server";
import { successResponse } from "@/lib/api-response";
import { getTopics } from "@/services/learning/topics.service";

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain") || undefined;
  const data = await getTopics(domain);
  return successResponse(data, "Topics fetched");
}
