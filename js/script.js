
//The Constructor
function Book(title, author, pages, haveread) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveread = haveread
  this.info = function () {
    return title + " by " + author + ", " + pages + " long."// + haveread
  }
}

//Creating book objects using constructor
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', '295 pages', false)

const chubbyHannah = new Book('Chubby Hannah', 'The Real Hannah Paget', '7 Pages', true)

const northernLights = new Book('Northern Lights', 'Phil', '734 Pages', true)

console.log(chubbyHannah.info())



//Books in array
let myLibrary = [theHobbit, northernLights, chubbyHannah];

//Selectors
const bookCase = document.querySelector('#bookcase');
const newBookButton = document.querySelector('#addBook');
const formClose = document.querySelector('[data-close-button]');
const formBG = document.querySelector('#background');
const formContainer = document.querySelector('#form');


//do stuff here
function addBookToLibrary() {

}

addBookToLibrary()

//Display myLibrary on page
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    let bookPlate = document.createElement('div');
    bookCase.appendChild(bookPlate).setAttribute('id', 'bookPlates')
    bookPlate.textContent += myLibrary[i].title;
  }
}

//Open Form
newBookButton.addEventListener('click', () => {
  formContainer.classList.add('active')
  formBG.classList.add('active')
})

//Close Form
formClose.addEventListener('click', () => {
  formContainer.classList.remove('active')
  formBG.classList.remove('active')
})

formBG.addEventListener('click', () => {
  formContainer.classList.remove('active')
  formBG.classList.remove('active')
})

//Returning form values
const radioVal = document.getElementsByName('haveRead');
function haveRead() {
  if (radioVal[0].checked) {
    return true
  } else if (radioVal[1].checked) {
    return false
  }
}
// TO DO!!! Check how bTitle is functioning. Try the below function for other values
function bTitle() {
  formContainer.addEventListener('submit', () => {
    return document.getElementById('bAuthor').value;
  })
}
console.log('title is ' + bTitle())

// function bTitle(){
//   return document.querySelector('bTitle').value;
// }

function bAuthor() {
  return document.getElementById('bAuthor').value;
}

function bPages() {
  return document.getElementById('bPages').value;
}

formContainer.addEventListener('submit', (e) => {
  //e.preventDefault()
  
  let answer2 = bAuthor();
  console.log(answer2);
  let answer3 = bPages();
  console.log(answer3);
  let answer4 = haveRead();
  console.log(answer4);
  formContainer.classList.remove('active')
  formBG.classList.remove('active')
})

  //   let nextBook = new Book(answer1, answer2, answer3)
  //   myLibrary.push(nextBook);
  //   displayBooks();
  // })

//const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', '295 pages', false)
