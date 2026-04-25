export interface SubscribeUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

export interface SendEmailInput {
  to: string;
  subject: string;
  template?: string;
  variables?: Record<string, unknown>;
}

export async function subscribeUser(_input: SubscribeUserInput) {
  return { success: true, message: "Not implemented yet" };
}

export async function sendEmail(_input: SendEmailInput) {
  return { success: true, message: "Not implemented yet" };
}
