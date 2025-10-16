import type { PropsWithChildren, HTMLAttributes } from 'react'

type DialogProps = PropsWithChildren<{
  open: boolean
  onClose: () => void
}>

export function Dialog({ open, onClose, children }: DialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-2xl rounded-xl border bg-white shadow-xl">
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={"border-b px-4 py-3 font-medium " + className} {...rest} />
}

export function DialogBody({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={"px-4 py-4 " + className} {...rest} />
}

export function DialogFooter({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={"flex items-center justify-end gap-2 border-t px-4 py-3 " + className} {...rest} />
}




