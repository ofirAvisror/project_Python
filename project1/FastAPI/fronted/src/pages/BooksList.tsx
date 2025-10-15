import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import type { Book } from '../api'
import { listBooks, deleteBook } from '../api'

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      setBooks(await listBooks())
    } catch (e: any) {
      setError(e?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Books</h1>
        <Link to="/add"><Button>Add Book</Button></Link>
      </div>
      {loading && <p className="text-sm text-neutral-500">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {books.length === 0 ? (
        <Card><CardContent>
          <div className="p-6 text-center text-neutral-500">No books found.</div>
        </CardContent></Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="text-base font-medium">Books List</div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-600">
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Author</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Rating</th>
                    <th className="w-44 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b, i) => (
                    <tr key={b.id} className={"border-t " + (i % 2 === 0 ? 'bg-white' : 'bg-neutral-50') + ' hover:bg-neutral-100/60'}>
                      <td className="px-4 py-2 font-medium">{b.title}</td>
                      <td className="px-4 py-2">{b.author}</td>
                      <td className="px-4 py-2 text-neutral-500">{b.description}</td>
                      <td className="px-4 py-2">{b.rating}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <Link to={`/edit/${b.id}`}><Button variant="outline" size="sm">Edit</Button></Link>
                          <Button variant="destructive" size="sm" onClick={async () => { await deleteBook(b.id!); await load() }}>Delete</Button>
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
    </div>
  )
}
