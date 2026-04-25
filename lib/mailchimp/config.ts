// Mailchimp Configuration
// Documentation: https://mailchimp.com/developer/

export const mailchimpConfig = {
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!, // e.g., 'us1', 'us2', etc.
  listId: process.env.MAILCHIMP_LIST_ID!, // Default audience/list ID
}

// Subscriber status types
export type SubscriberStatus = 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional'

// Subscriber interface
export interface MailchimpSubscriber {
  email_address: string
  status: SubscriberStatus
  merge_fields?: {
    FNAME?: string
    LNAME?: string
    PHONE?: string
    ROLE?: string
    COLLEGE?: string
    [key: string]: string | undefined
  }
  tags?: string[]
}

// Campaign interface
export interface MailchimpCampaign {
  type: 'regular' | 'plaintext' | 'absplit' | 'rss' | 'variate'
  recipients: {
    list_id: string
    segment_opts?: {
      saved_segment_id?: number
      match?: 'any' | 'all'
      conditions?: Array<{
        condition_type: string
        field: string
        op: string
        value: string | string[]
      }>
    }
  }
  settings: {
    subject_line: string
    preview_text?: string
    title: string
    from_name: string
    reply_to: string
    template_id?: number
  }
}

// Email templates for different scenarios
export const emailTemplates = {
  welcome: {
    student: 'welcome-student',
    cpo: 'welcome-cpo',
    recruiter: 'welcome-recruiter',
  },
  jobAlert: 'job-alert',
  applicationUpdate: 'application-update',
  placementCongrats: 'placement-congratulations',
  assessmentReminder: 'assessment-reminder',
  subscriptionExpiry: 'subscription-expiry',
  newsletter: 'monthly-newsletter',
}

// Audience tags for segmentation
export const audienceTags = {
  roles: ['student', 'cpo', 'recruiter', 'admin'],
  subscriptionStatus: ['free', 'premium', 'enterprise'],
  placementStatus: ['placed', 'not_placed', 'in_progress'],
  colleges: [] as string[], // Dynamically populated
}
