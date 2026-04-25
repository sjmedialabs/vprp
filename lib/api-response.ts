/**
 * API Response Utilities
 * Standardized response format for all API routes
 */

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Success response helper
export function successResponse<T>(
  data: T,
  message?: string,
  meta?: ApiResponse["meta"],
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      meta,
    },
    { status }
  );
}

// Error response helper
export function errorResponse(
  error: string | Error | ZodError,
  status: number = 400
): NextResponse<ApiResponse> {
  let errorMessage: string;

  if (error instanceof ZodError) {
    // Format Zod validation errors
    const errors = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
    errorMessage = errors.join(", ");
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = error;
  }

  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
    },
    { status }
  );
}

// Not implemented placeholder
export function notImplementedResponse(
  resourceName?: string
): NextResponse<ApiResponse> {
  void resourceName;
  return NextResponse.json(
    {
      success: true,
      message: "Not implemented yet",
    },
    { status: 200 }
  );
}

// Unauthorized response
export function unauthorizedResponse(
  message: string = "Unauthorized"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 401 }
  );
}

// Forbidden response
export function forbiddenResponse(
  message: string = "Access denied"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 403 }
  );
}

// Not found response
export function notFoundResponse(
  resource: string = "Resource"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
    },
    { status: 404 }
  );
}

// Server error response
export function serverErrorResponse(
  error?: Error
): NextResponse<ApiResponse> {
  console.error("Server error:", error);
  return NextResponse.json(
    {
      success: false,
      error: "Internal server error",
    },
    { status: 500 }
  );
}
