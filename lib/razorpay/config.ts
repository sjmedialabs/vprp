// Razorpay Configuration
// Documentation: https://razorpay.com/docs/

export const razorpayConfig = {
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
  currency: 'INR',
  company_name: 'VPRP - Virtual Placement Readiness Platform',
}

// Order creation options interface
export interface RazorpayOrderOptions {
  amount: number // Amount in paise (1 INR = 100 paise)
  currency?: string
  receipt?: string
  notes?: Record<string, string>
}

// Payment verification interface
export interface RazorpayPaymentVerification {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

// Checkout options interface
export interface RazorpayCheckoutOptions {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  order_id: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  notes?: Record<string, string>
  theme?: {
    color?: string
  }
  handler?: (response: RazorpayPaymentVerification) => void
}

// Subscription plan pricing (in INR)
export const subscriptionPricing = {
  individual: {
    basic: 999,
    premium: 2499,
    pro: 4999,
  },
  college: {
    starter: 49999, // Up to 100 students
    growth: 99999, // Up to 500 students
    enterprise: 199999, // Unlimited students
  },
}
