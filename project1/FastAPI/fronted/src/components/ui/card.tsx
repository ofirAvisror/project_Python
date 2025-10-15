import type { PropsWithChildren } from 'react'

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-xl border bg-white/60 shadow-sm">{children}</div>
}

export function CardHeader({ children }: PropsWithChildren) {
  return <div className="border-b px-4 py-3">{children}</div>
}

export function CardContent({ children }: PropsWithChildren) {
  return <div className="px-4 py-3">{children}</div>
}


