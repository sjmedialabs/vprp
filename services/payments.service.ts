export interface CreateOrderInput {
  amount: number;
  currency?: "INR";
  receipt?: string;
}

export async function createOrderPlaceholder(_input: CreateOrderInput) {
  return { success: true, message: "Not implemented yet" };
}

export async function handleRazorpayWebhookPlaceholder(_payload: string) {
  return { success: true, message: "Not implemented yet" };
}
