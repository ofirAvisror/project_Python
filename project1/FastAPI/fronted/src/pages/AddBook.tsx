import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Book } from '../api'
import { createBook } from '../api'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'

export default function AddBook() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Book>({ title: '', author: '', description: '', rating: 0 })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setSubmitting(true); setError(null)
    try {
      await createBook(form)
      navigate('/')
    } catch (e: any) {
      setError(e?.message ?? 'Error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-lg font-medium">Add Book</h1>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
            <Input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            <Input type="number" placeholder="Rating (0-100)" value={form.rating} min={0} max={100} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} required />
            <div className="flex gap-2">
              <Button disabled={submitting} variant="primary">{submitting ? 'Saving…' : 'Save'}</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
