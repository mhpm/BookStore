class BookService {
  constructor() {
    this.apiURL = '/api/books'
  }

  async getBooks() {
    let res = await fetch(this.apiURL)
    let books = res.json()
    return books
  }

  async postBook(book) {
    await fetch(this.apiURL, {
      method: 'POST',
      body: book
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))
  }

  async deleteBook(id) {
    let res = await fetch(`${this.apiURL}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    let data = await res.json()
    console.log(data)
  }
}

export default BookService
