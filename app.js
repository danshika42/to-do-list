 // book class : represents a book 
 class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }

 // ui class : handle ui tasks

class UI{

   static displayBooks() {
    const books=Store.getBooks();
    books.map((book)=>UI.addBookToList(book));
   }

   static addBookToList(book) {
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
   }
 
 
   static deleteBook(el){
       if(el.classList.contains('delete')){
           el.parentElement.parentElement.remove();
       }
    }

  
  
    static showAlert(message,className){
          const div=document.createElement('div');
          div.className=`alert alert-${className}`;
          div.appendChild(document.createTextNode(message));
          const container=document.querySelector('.container');
          const form=document.querySelector('#book-form');
          container.insertBefore(div,form);

          // vanish in 3 sec
          setTimeout(()=>{
              document.querySelector('.alert').remove()
          },3000)
  }

    
  
  static clearFields(){
      document.getElementById('title').value="";
      document.getElementById('author').value="";
      document.getElementById('isbn').value="";
   }
  

}


 // store class : handles storage
 class Store{
  static getBooks(){
      let books;
      if(localStorage.getItem('books')==null){
        books=[];
      }
      else{
        books=JSON.parse(localStorage.getItem('books'));
      }
     
      return books;
  }

  static addBooks(book){
      const books=Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

 }
 // event : display a book
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
 // event : add a book
    document.getElementById('book-form').addEventListener('submit',(e)=>{
    //   get form values
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const isbn=document.getElementById('isbn').value;

    // validate

    if(title=== ''|| author=== ''|| isbn===''){
        UI.showAlert('Please fill in all the fields','danger');
    }
    else{
    const book =new Book(title,author,isbn);
    //  add book to UI
    UI.addBookToList(book)
    // add book to store
    Store.addBooks(book);
    // clearfield
    UI.showAlert('Task Added','success');

    UI.clearFields();
    }

 });

 // event : remove a book

 document.querySelector('#book-list').addEventListener('click',e=>{

    // remve book from ui
     UI.deleteBook(e.target);
    //  remove book from stroage
   
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent); 
  
     UI.showAlert('Congratulations!! Your Task Completed','success');

 });
