import { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      setLoading(true); setError(null)
      try {
        const books = await listBooks()
        const b = books.find(x => x.id === bookId)
        if (!b) throw new Error('Book not found')
        setForm({ title: b.title, author: b.author, description: b.description, rating: b.rating })
      } catch (e: any) {
        setError(e?.message ?? 'Error')
      } finally {
        setLoading(false)
      }
    })()
  }, [bookId])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      await updateBook(bookId, form)
      navigate('/')
    } catch (e: any) {
      setError(e?.message ?? 'Error')
    }
  }

  if (loading) return <div className="mx-auto max-w-xl px-4 py-8">Loading…</div>

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-lg font-medium">Edit Book</h1>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
            <Input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            <Input type="number" placeholder="Rating (0-100)" value={form.rating} min={0} max={100} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} required />
            <div className="flex gap-2">
              <Button variant="primary">Save</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
