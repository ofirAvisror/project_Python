import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import type { Book } from '../api'
import { listBooks, deleteBook } from '../api'
import Input from '../components/ui/input'
import { Dialog, DialogBody, DialogFooter, DialogHeader } from '../components/ui/dialog'

type SortKey = 'title' | 'author' | 'rating'
type ViewMode = 'grid' | 'table'

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('title')
  const [asc, setAsc] = useState(true)
  const [view, setView] = useState<ViewMode>('grid')
  const [preview, setPreview] = useState<Book | null>(null)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const data = await listBooks()
      setBooks(data)
    } catch (e: any) {
      setError(e?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byText = q
      ? books.filter(b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.description || '').toLowerCase().includes(q)
        )
      : books.slice()

    byText.sort((a, b) => {
      let va: string | number = ''
      let vb: string | number = ''
      if (sortBy === 'rating') { va = a.rating ?? 0; vb = b.rating ?? 0 }
      if (sortBy === 'title')  { va = a.title; vb = b.title }
      if (sortBy === 'author') { va = a.author; vb = b.author }
      if (typeof va === 'number' && typeof vb === 'number') {
        return asc ? va - vb : vb - va
      }
      return asc
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })

    return byText
  }, [books, query, sortBy, asc])

  const handleDelete = async (id?: number) => {
    if (!id) return
    const ok = window.confirm('Delete this book?')
    if (!ok) return
    await deleteBook(id)
    await load()
  }

  return (
    <div className="min-h-screen w-full bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <header className="relative mb-8 overflow-hidden rounded-3xl border border-white/20 bg-white/80 p-6 backdrop-blur-md shadow-xl dark:border-white/10 dark:bg-neutral-900/70">
          <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/25 via-fuchsia-500/25 to-rose-500/25 blur-2xl" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-blue-700 via-fuchsia-700 to-rose-700 bg-clip-text text-3xl font-extrabold text-transparent">
                Your Library
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Search, sort, and manage your books.
              </p>
            </div>
            <Link to="/add"><Button className="rounded-lg">Add Book</Button></Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by title, author, or description…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 rounded-xl border-gray-300/70 bg-white/70 text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-100"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="h-11 w-full rounded-xl border border-gray-300/70 bg-white/70 px-3 text-sm dark:border-white/10 dark:bg-neutral-900/60"
              >
                <option value="title">Sort: Title</option>
                <option value="author">Sort: Author</option>
                <option value="rating">Sort: Rating</option>
              </select>
              <Button
                variant="outline"
                onClick={() => setAsc(!asc)}
                className="h-11 w-11 rounded-xl border border-gray-300/70 bg-white/70 text-gray-700 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-200"
                title={asc ? 'Ascending' : 'Descending'}
              >
                {asc ? '↑' : '↓'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setView(view === 'grid' ? 'table' : 'grid')}
                className="h-11 w-24 rounded-xl border border-gray-300/70 bg-white/70 text-gray-700 dark:border-white/10 dark:bg-neutral-900/60 dark:text-gray-200"
              >
                {view === 'grid' ? 'Table' : 'Grid'}
              </Button>
            </div>
          </div>
        </header>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-black/5 bg-white/60 dark:border-white/10 dark:bg-neutral-900/60"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <Card className="rounded-3xl border-dashed">
            <CardContent className="p-10 text-center">
              <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-rose-500/20" />
              <h2 className="text-lg font-semibold">No books found</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Try a different search or add a new book.
              </p>
              <div className="mt-4">
                <Link to="/add">
                  <Button className="rounded-xl bg-gradient-to-r from-blue-600 via-fuchsia-600 to-rose-600 px-4 py-2 text-white">
                    Add your first book
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && filtered.length > 0 && view === 'grid' && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <Card
                key={b.id}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:bg-neutral-900/70"
              >
                <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/15 via-fuchsia-500/15 to-rose-500/15 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <CardHeader className="pb-0">
                  <h3 className="line-clamp-1 text-lg font-semibold">{b.title}</h3>
                  <p className="line-clamp-1 text-sm text-neutral-500">{b.author}</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300">
                    {b.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-neutral-500">Rating</span>
                      <span className="rounded-md border border-black/5 bg-white/70 px-2 py-0.5 text-xs font-semibold dark:border-white/10 dark:bg-neutral-800/70">
                        {b.rating}/100
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="rounded-lg" onClick={() => setPreview(b)}>View</Button>
                      <Link to={`/edit/${b.id}`}>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-lg"
                        onClick={() => handleDelete(b.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-fuchsia-600 to-rose-600 transition-all"
                      style={{ width: `${Math.max(0, Math.min(100, b.rating || 0))}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && view === 'table' && (
          <Card className="overflow-hidden rounded-3xl border border-white/20 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/70">
            <CardHeader>
              <div className="text-base font-semibold">Books</div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <thead className="bg-neutral-50/70 text-neutral-600 dark:bg-neutral-800/70">
                    <tr>
                      <th className="px-5 py-3">Title</th>
                      <th className="px-5 py-3">Author</th>
                      <th className="px-5 py-3">Description</th>
                      <th className="px-5 py-3">Rating</th>
                      <th className="w-44 px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b, i) => (
                      <tr
                        key={b.id}
                        className={(i % 2 === 0 ? 'bg-white/60' : 'bg-neutral-50/60') +
                          ' border-t border-neutral-100/70 transition hover:bg-neutral-100/70 dark:border-neutral-800/70 dark:hover:bg-neutral-800/60'}
                      >
                        <td className="px-5 py-3 font-medium">{b.title}</td>
                        <td className="px-5 py-3">{b.author}</td>
                        <td className="px-5 py-3 text-neutral-600 dark:text-neutral-300 line-clamp-2">
                          {b.description}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md border border-black/5 bg-white/70 px-2 py-0.5 text-xs font-semibold dark:border-white/10 dark:bg-neutral-800/70">
                              {b.rating}/100
                            </span>
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-800">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-fuchsia-600 to-rose-600"
                                style={{ width: `${Math.max(0, Math.min(100, b.rating || 0))}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="rounded-lg" onClick={() => setPreview(b)}>View</Button>
                            <Link to={`/edit/${b.id}`}>
                              <Button variant="outline" size="sm" className="rounded-lg">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-lg"
                              onClick={() => handleDelete(b.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Preview modal */}
        <Dialog open={!!preview} onClose={() => setPreview(null)}>
          <DialogHeader>{preview?.title}</DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              <div><span className="text-sm text-neutral-500">Author: </span>{preview?.author}</div>
              <div className="text-sm text-neutral-500">Description:</div>
              <p className="whitespace-pre-wrap text-sm leading-6">{preview?.description}</p>
              <div className="text-sm">Rating: {preview?.rating}/100</div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Close</Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  )
}
