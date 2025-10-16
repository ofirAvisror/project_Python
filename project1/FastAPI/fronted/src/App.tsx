import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BooksList from './pages/BooksList'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'

type Book = {
  id?: number
  title: string
  author: string
  description: string
  rating: number
}

const API = 'http://127.0.0.1:8000'

export default function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Book>({ title: '', author: '', description: '', rating: 0 })

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch(`${API}/`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setBooks(Array.isArray(data) ? data : [])
    } catch (e: any) {
      setError(e?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }, [])

  const createBook = useCallback(async (book: Book) => {
    const res = await fetch(`${API}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
    if (!res.ok) throw new Error('Create failed')
    await load()
  }, [load])

  const updateBook = useCallback(async (id: number, book: Book) => {
    const url = new URL(`${API}/`)
    url.searchParams.set('book_id', String(id))
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
    if (!res.ok) throw new Error('Update failed')
    await load()
  }, [load])

  const deleteBook = useCallback(async (id: number) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Delete failed')
    await load()
  }, [load])

  useEffect(() => { load() }, [load])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (editingId == null) {
      await createBook(form)
    } else {
      await updateBook(editingId, form)
      setEditingId(null)
    }
    setForm({ title: '', author: '', description: '', rating: 0 })
  }

  return (
    <BrowserRouter>
      <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent)/0.6)] text-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-semibold tracking-tight">Books</Link>
          <Link to="/add" className="rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-[hsl(var(--accent))] hover:bg-white">Add Book</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  )
}
