import { NextRequest } from "next/server";
import { successResponse } from "@/lib/api-response";
import { searchLearning } from "@/services/learning/search.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  const data = await searchLearning(query);
  return successResponse(data, "Search results");
}
