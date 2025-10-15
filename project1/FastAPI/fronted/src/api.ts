export type Book = {
  id?: number
  title: string
  author: string
  description: string
  rating: number
}

const API = 'http://127.0.0.1:8000'

export async function listBooks(): Promise<Book[]> {
  const res = await fetch(`${API}/`)
  if (!res.ok) throw new Error('Failed to fetch books')
  return res.json()
}

export async function createBook(book: Book): Promise<void> {
  const res = await fetch(`${API}/`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book)
  })
  if (!res.ok) throw new Error('Failed to create book')
}

export async function updateBook(id: number, book: Book): Promise<void> {
  const url = new URL(`${API}/`)
  url.searchParams.set('book_id', String(id))
  const res = await fetch(url, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book)
  })
  if (!res.ok) throw new Error('Failed to update book')
}

export async function deleteBook(id: number): Promise<void> {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete book')
}
