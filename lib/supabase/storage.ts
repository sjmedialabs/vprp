export const storageBuckets = {
  resumes: "resumes",
  projects: "projects",
} as const;

export function getStorageBucketSetupNote() {
  return {
    success: true,
    message: "Not implemented yet",
    buckets: storageBuckets,
  };
}
