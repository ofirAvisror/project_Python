import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline'
  size?: 'sm' | 'md'
}

export default function Button({ className = '', variant = 'primary', size = 'md', ...rest }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-60 disabled:cursor-not-allowed'
  const sizes = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-4 text-sm'
  const variants: Record<string, string> = {
    primary: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:opacity-90',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-neutral-300 text-neutral-900 hover:bg-neutral-50',
  }
  const classes = `${base} ${sizes} ${variants[variant]} ${className}`
  return <button className={classes} {...rest} />
}


