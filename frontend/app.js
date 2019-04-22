import('./styles/app.css')
import UserInterface from './UI'
const userInterface = new UserInterface()

document.addEventListener('DOMContentLoaded', () => {
  userInterface.renderBooks()
})

document.querySelector('#form-book').addEventListener('submit', e => {
  let title = document.querySelector('#title').value
  let author = document.querySelector('#author').value
  let isbn = document.querySelector('#isbn').value
  let image = document.querySelector('#image').files[0]

  let formData = new FormData()
  formData.append('title', title)
  formData.append('author', author)
  formData.append('isbn', isbn)
  formData.append('image', image)

  userInterface.addNewBook(formData)

  e.preventDefault()
})

document.querySelector('#books-container').addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    let id = e.target.getAttribute('_id')
    userInterface.deteleBook(id)
  }
  e.preventDefault()
})
