import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Book } from '../api'
import { listBooks, updateBook } from '../api'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'

export default function EditBook() {
  const navigate = useNavigate()
  const { id } = useParams()
  const bookId = Number(id)

  const [form, setForm] = useState<Book>({ title: '', author: '', description: '', rating: 0 })
  const [original, setOriginal] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      setLoading(true); setError(null)
      try {
        const books = await listBooks()
        const b = books.find(x => String(x.id) === String(bookId))
        if (!b) throw new Error('Book not found')
        const base: Book = {
          title: b.title ?? '',
          author: b.author ?? '',
          description: b.description ?? '',
          rating: Number.isFinite(b.rating) ? b.rating : 0,
        }
        setForm(base)
        setOriginal(base)
      } catch (e: any) {
        setError(e?.message ?? 'Error')
      } finally {
        setLoading(false)
      }
    })()
  }, [bookId])

  const changed = useMemo(() => {
    if (!original) return false
    return (
      form.title !== original.title ||
      form.author !== original.author ||
      form.description !== original.description ||
      Number(form.rating) !== Number(original.rating)
    )
  }, [form, original])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setSubmitting(true); setError(null)
    try {
      await updateBook(bookId, form)
      navigate('/')
    } catch (e: any) {
      setError(e?.message ?? 'Error')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    if (!original) return
    setForm(original)
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[radial-gradient(40%_60%_at_20%_10%,rgba(59,130,246,0.18),transparent),radial-gradient(35%_55%_at_80%_10%,rgba(236,72,153,0.18),transparent),linear-gradient(to_bottom,rgba(17,24,39,0.06),rgba(17,24,39,0.06))]">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card className="rounded-3xl border border-white/20 bg-white/80 p-6 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/70">
            <div className="space-y-4">
              <div className="h-6 w-40 animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80" />
              <div className="h-11 animate-pulse rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80" />
              <div className="h-11 animate-pulse rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80" />
              <div className="h-28 animate-pulse rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80" />
              <div className="h-3 animate-pulse rounded-full bg-neutral-200/80 dark:bg-neutral-800/80" />
              <div className="flex gap-2">
                <div className="h-11 w-28 animate-pulse rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80" />
                <div className="h-11 w-28 animate-pulse rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(40%_60%_at_20%_10%,rgba(59,130,246,0.18),transparent),radial-gradient(35%_55%_at_80%_10%,rgba(236,72,153,0.18),transparent),linear-gradient(to_bottom,rgba(17,24,39,0.06),rgba(17,24,39,0.06))]">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="relative mx-auto max-w-2xl">
          <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500/30 via-fuchsia-500/30 to-rose-500/30 blur-xl" />
          <Card className="relative rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/70">
            <CardHeader className="space-y-1 border-b border-black/5 pb-6 dark:border-white/10">
              <div className="flex items-center justify-between">
                <h1 className="bg-gradient-to-r from-blue-600 via-fuchsia-600 to-rose-600 bg-clip-text text-2xl font-extrabold text-transparent">
                  Edit Book
                </h1>
                <span className="rounded-full border border-black/5 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm dark:border-white/10 dark:text-gray-300">
                  Library · Update
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Update the details and save your changes.
              </p>
            </CardHeader>

            <CardContent className="p-6">
              {error && (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-200">Title</label>
                    <Input
                      placeholder="e.g., Clean Architecture"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      required
                      className="h-11 rounded-xl border-gray-300/70 bg-white/70 text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-200">Author</label>
                    <Input
                      placeholder="e.g., Robert C. Martin"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                      required
                      className="h-11 rounded-xl border-gray-300/70 bg-white/70 text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800 dark:text-gray-200">Description</label>
                  <textarea
                    placeholder="Short synopsis or notes…"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                    rows={5}
                    className="w-full resize-y rounded-xl border border-gray-300/70 bg-white/70 px-3 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-200">Rating</label>
                    <span className="rounded-lg border border-black/5 bg-white/60 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-200">
                      {Number.isFinite(form.rating) ? form.rating : 0}/100
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={form.rating}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        rating: Math.max(0, Math.min(100, Number(e.target.value) || 0)),
                      })
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-blue-500/30 via-fuchsia-500/30 to-rose-500/30 accent-blue-600"
                  />
                  <div className="grid grid-cols-5 text-[10px] text-gray-500 dark:text-gray-400">
                    <span>0</span><span className="text-center">25</span>
                    <span className="text-center">50</span>
                    <span className="text-center">75</span>
                    <span className="text-right">100</span>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="h-11 rounded-xl border border-gray-300/70 bg-white/70 px-5 text-gray-700 transition hover:bg-white dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-200"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={!changed || submitting}
                    className="h-11 rounded-xl border border-gray-300/70 bg-white/70 px-5 text-gray-700 transition hover:bg-white disabled:opacity-60 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-200"
                  >
                    Reset
                  </Button>

                  <Button
                    disabled={submitting || !changed}
                    variant="primary"
                    className="h-11 rounded-xl bg-gradient-to-r from-blue-600 via-fuchsia-600 to-rose-600 px-6 font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
                  >
                    {submitting ? 'Saving…' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
