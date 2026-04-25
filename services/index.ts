/**
 * API Services
 * Centralized API service functions for data fetching
 */

// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

// ============================================================================
// AUTH SERVICES
// ============================================================================

export const authService = {
  login: async (email: string, password: string) => {
    // TODO: Implement login with Supabase
    return apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async (data: {
    email: string;
    password: string;
    role: string;
  }) => {
    // TODO: Implement signup with Supabase
    return apiRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: async () => {
    // TODO: Implement logout with Supabase
    return apiRequest("/api/auth/logout", { method: "POST" });
  },

  forgotPassword: async (email: string) => {
    // TODO: Implement password reset
    return apiRequest("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  verifyOtp: async (email: string, otp: string) => {
    // TODO: Implement OTP verification
    return apiRequest("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  },
};

// ============================================================================
// USER SERVICES
// ============================================================================

export const userService = {
  getProfile: async () => {
    return apiRequest("/api/users/profile");
  },

  updateProfile: async (data: Record<string, unknown>) => {
    return apiRequest("/api/users/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  uploadResume: async (file: File) => {
    // TODO: Implement file upload to Supabase Storage
    const formData = new FormData();
    formData.append("file", file);
    return apiRequest("/api/users/resume", {
      method: "POST",
      body: formData,
      headers: {},
    });
  },
};

// ============================================================================
// JOB SERVICES
// ============================================================================

export const jobService = {
  getAll: async (filters?: Record<string, unknown>) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    return apiRequest(`/api/jobs?${params}`);
  },

  getById: async (id: string) => {
    return apiRequest(`/api/jobs/${id}`);
  },

  create: async (data: Record<string, unknown>) => {
    return apiRequest("/api/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/api/jobs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/api/jobs/${id}`, { method: "DELETE" });
  },

  apply: async (jobId: string, data: Record<string, unknown>) => {
    return apiRequest(`/api/jobs/${jobId}/apply`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getApplications: async (jobId: string) => {
    return apiRequest(`/api/jobs/${jobId}/applications`);
  },
};

// ============================================================================
// ASSESSMENT SERVICES
// ============================================================================

export const assessmentService = {
  getAll: async () => {
    return apiRequest("/api/assessments");
  },

  getById: async (id: string) => {
    return apiRequest(`/api/assessments/${id}`);
  },

  start: async (id: string) => {
    return apiRequest(`/api/assessments/${id}/start`, { method: "POST" });
  },

  submitAnswer: async (
    attemptId: string,
    questionId: string,
    answer: string
  ) => {
    return apiRequest(`/api/attempts/${attemptId}/answers`, {
      method: "POST",
      body: JSON.stringify({ questionId, answer }),
    });
  },

  complete: async (attemptId: string) => {
    return apiRequest(`/api/attempts/${attemptId}/complete`, {
      method: "POST",
    });
  },

  getResults: async (attemptId: string) => {
    return apiRequest(`/api/attempts/${attemptId}/results`);
  },
};

// ============================================================================
// RANKING SERVICES
// ============================================================================

export const rankingService = {
  getCollegeRankings: async (collegeId: string) => {
    return apiRequest(`/api/rankings/college/${collegeId}`);
  },

  getNationalRankings: async () => {
    return apiRequest("/api/rankings/national");
  },

  getUserRank: async (userId: string) => {
    return apiRequest(`/api/rankings/user/${userId}`);
  },
};

// ============================================================================
// PASSPORT SERVICES
// ============================================================================

export const passportService = {
  get: async (userId: string) => {
    return apiRequest(`/api/passport/${userId}`);
  },

  addProject: async (data: Record<string, unknown>) => {
    return apiRequest("/api/passport/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateProject: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/api/passport/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteProject: async (id: string) => {
    return apiRequest(`/api/passport/projects/${id}`, { method: "DELETE" });
  },

  generatePdf: async (userId: string) => {
    return apiRequest(`/api/passport/${userId}/pdf`);
  },
};

// ============================================================================
// COLLEGE SERVICES
// ============================================================================

export const collegeService = {
  getAll: async () => {
    return apiRequest("/api/colleges");
  },

  getById: async (id: string) => {
    return apiRequest(`/api/colleges/${id}`);
  },

  getDepartments: async (collegeId: string) => {
    return apiRequest(`/api/colleges/${collegeId}/departments`);
  },

  getStudents: async (collegeId: string, filters?: Record<string, unknown>) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    return apiRequest(`/api/colleges/${collegeId}/students?${params}`);
  },

  getAnalytics: async (collegeId: string) => {
    return apiRequest(`/api/colleges/${collegeId}/analytics`);
  },
};

// ============================================================================
// COMPANY SERVICES
// ============================================================================

export const companyService = {
  getAll: async () => {
    return apiRequest("/api/companies");
  },

  getById: async (id: string) => {
    return apiRequest(`/api/companies/${id}`);
  },

  create: async (data: Record<string, unknown>) => {
    return apiRequest("/api/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/api/companies/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

// ============================================================================
// PAYMENT SERVICES
// ============================================================================

export const paymentService = {
  createOrder: async (data: { planId: string; amount: number }) => {
    return apiRequest("/api/payments/create-order", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    return apiRequest("/api/payments/verify", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getSubscription: async () => {
    return apiRequest("/api/subscriptions/current");
  },

  getPlans: async () => {
    return apiRequest("/api/subscriptions/plans");
  },
};

// ============================================================================
// NOTIFICATION SERVICES
// ============================================================================

export const notificationService = {
  getAll: async () => {
    return apiRequest("/api/notifications");
  },

  markAsRead: async (id: string) => {
    return apiRequest(`/api/notifications/${id}/read`, { method: "POST" });
  },

  markAllAsRead: async () => {
    return apiRequest("/api/notifications/read-all", { method: "POST" });
  },

  updatePreferences: async (preferences: Record<string, boolean>) => {
    return apiRequest("/api/notifications/preferences", {
      method: "PATCH",
      body: JSON.stringify(preferences),
    });
  },
};

// ============================================================================
// ADMIN SERVICES
// ============================================================================

export const adminService = {
  getUsers: async (filters?: Record<string, unknown>) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    return apiRequest(`/api/admin/users?${params}`);
  },

  updateUser: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  getColleges: async () => {
    return apiRequest("/api/admin/colleges");
  },

  approveCollege: async (id: string) => {
    return apiRequest(`/api/admin/colleges/${id}/approve`, { method: "POST" });
  },

  getCompanies: async () => {
    return apiRequest("/api/admin/companies");
  },

  approveCompany: async (id: string) => {
    return apiRequest(`/api/admin/companies/${id}/approve`, { method: "POST" });
  },

  getAnalytics: async () => {
    return apiRequest("/api/admin/analytics");
  },

  getSystemHealth: async () => {
    return apiRequest("/api/admin/health");
  },
};

export * from "./mailchimp.service";
export * from "./payments.service";
