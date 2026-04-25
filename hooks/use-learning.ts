"use client";

import { useQuery } from "@tanstack/react-query";

export function useTopics(domain?: string) {
  return useQuery({
    queryKey: ["topics", domain],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (domain) params.set("domain", domain);
      const response = await fetch(`/api/topics?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch topics");
      const payload = await response.json();
      return payload.data;
    },
  });
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    enabled: query.length > 1,
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to search");
      const payload = await response.json();
      return payload.data;
    },
  });
}
