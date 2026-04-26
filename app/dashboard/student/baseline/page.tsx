'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const QUESTIONS = [
  {
    id: 'q1',
    prompt: 'If a train travels 120 km in 2 hours, what is its average speed?',
    options: [
      { key: 'A', label: '40 km/h' },
      { key: 'B', label: '60 km/h' },
      { key: 'C', label: '80 km/h' },
      { key: 'D', label: '100 km/h' },
    ],
    answer: 'B',
    explain: 'Average speed = distance / time = 120 / 2 = 60 km/h.',
  },
  {
    id: 'q2',
    prompt: 'Which data structure follows FIFO order?',
    options: [
      { key: 'A', label: 'Stack' },
      { key: 'B', label: 'Queue' },
      { key: 'C', label: 'Binary search tree' },
      { key: 'D', label: 'Heap' },
    ],
    answer: 'B',
    explain: 'A queue removes the oldest element first (first-in, first-out).',
  },
  {
    id: 'q3',
    prompt: 'What is the time complexity of binary search on a sorted array of size n?',
    options: [
      { key: 'A', label: 'O(n)' },
      { key: 'B', label: 'O(n log n)' },
      { key: 'C', label: 'O(log n)' },
      { key: 'D', label: 'O(1)' },
    ],
    answer: 'C',
    explain: 'Each step halves the search space.',
  },
  {
    id: 'q4',
    prompt: 'In SQL, which clause filters rows before grouping?',
    options: [
      { key: 'A', label: 'WHERE' },
      { key: 'B', label: 'HAVING' },
      { key: 'C', label: 'ORDER BY' },
      { key: 'D', label: 'LIMIT' },
    ],
    answer: 'A',
    explain: 'WHERE filters rows before GROUP BY; HAVING filters after aggregation.',
  },
  {
    id: 'q5',
    prompt: 'Which HTTP method is idempotent and typically used to fetch a resource?',
    options: [
      { key: 'A', label: 'POST' },
      { key: 'B', label: 'GET' },
      { key: 'C', label: 'PATCH' },
      { key: 'D', label: 'CONNECT' },
    ],
    answer: 'B',
    explain: 'GET requests should not change server state and are safe/idempotent in REST design.',
  },
] as const

export default function StudentBaselinePage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    for (const q of QUESTIONS) {
      if (!answers[q.id]) {
        toast.error('Answer every question before submitting.')
        return
      }
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/student/baseline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        toast.error(json.error ?? 'Submission failed.')
        return
      }
      setScore(json.data.readiness_score as number)
      setSubmitted(true)
      toast.success('Baseline submitted.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Baseline readiness test</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/student">Dashboard</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Mandatory baseline</CardTitle>
          <CardDescription>
            Five multiple-choice questions. Your readiness score updates as soon as you submit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium">{q.prompt}</p>
                <RadioGroup
                  value={answers[q.id] ?? ''}
                  onValueChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                  disabled={submitted}
                  className="grid gap-2"
                >
                  {q.options.map((o) => (
                    <div key={o.key} className="flex items-center gap-2">
                      <RadioGroupItem value={o.key} id={`${q.id}-${o.key}`} />
                      <Label htmlFor={`${q.id}-${o.key}`} className="font-normal">
                        {o.key}. {o.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {submitted && (
                  <p className="text-sm text-muted-foreground">
                    Correct: {q.answer}. {q.explain}
                  </p>
                )}
              </div>
            ))}
            {!submitted ? (
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit test'}
              </Button>
            ) : (
              <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
                <p className="text-lg font-semibold">
                  Your readiness score: <span className="text-primary">{score}%</span>
                </p>
                <Button type="button" asChild>
                  <Link href="/dashboard/student">Go to dashboard</Link>
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
