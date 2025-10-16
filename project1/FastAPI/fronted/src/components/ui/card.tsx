import type { PropsWithChildren } from 'react'

type WithClassName = { className?: string }

export function Card({ children, className }: PropsWithChildren<WithClassName>) {
  return <div className={"rounded-xl border bg-white/60 shadow-sm " + (className ?? '')}>{children}</div>
}

export function CardHeader({ children, className }: PropsWithChildren<WithClassName>) {
  return <div className={"border-b px-4 py-3 " + (className ?? '')}>{children}</div>
}

export function CardContent({ children, className }: PropsWithChildren<WithClassName>) {
  return <div className={"px-4 py-3 " + (className ?? '')}>{children}</div>
}


