import services from './services/Services'
import { format } from 'timeago.js'

class UserInterface {
  async renderBooks() {
    let books = await services.bookService.getBooks()
    let bookContainer = document.querySelector('#books-container')
    bookContainer.innerHTML = ''

    books.forEach(book => {
      let div = document.createElement('div')
      div.innerHTML = `
        <div class='card mb-3 text-dark'>
            <div class='row no-gutters'>
                <div class='col-md'>
                    <img src='/${
                      book.imagePath
                    }' alt='cover' class='img-fluid' />
                </div>
                <div class='col-md-8'>
                    <div class='card-body'>
                        <h4 class='card-title'>Title: ${book.title}</h4>
                        <p class='card-text'>Author: ${book.author}</p>
                        <p class="card-text"><small class="text-muted"></small></p>      
                    </div>
                    
                </div>
                
            </div>
             <div class="card-footer">
                <small class="text-muted">created at ${format(
                  book.createdAt
                )}</small>
                <a href='#' class='btn btn-sm float-right btn-danger delete' _id='${
                  book._id
                }'>Delete Book</a>
            </div>
        </div>
      `
      bookContainer.appendChild(div)
    })
  }

  async addNewBook(book) {
    await services.bookService.postBook(book)
    this.clearBookForm()
    this.renderBooks()
    this.renderMessage('New book added!', 'success')
  }

  clearBookForm() {
    document.querySelector('#form-book').reset()
  }

  renderMessage(message, type) {
    let div = document.createElement('div')
    div.className = `alert alert-${type} message`
    div.appendChild(document.createTextNode(message))

    let colForm = document.querySelector('#colForm')
    let form = document.querySelector('#form-book')
    colForm.insertBefore(div, form)

    setTimeout(() => {
      document.querySelector('.message').remove()
    }, 3000)
  }

  async deteleBook(id) {
    await services.bookService.deleteBook(id)
    this.renderMessage('Book deleted!', 'danger')
    this.renderBooks()
  }
}

export default UserInterface
