
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
//const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', '295 pages', true)
//const theHabbit = new Book('The Hobbit', 'J.R.R. Tolkein', '295 pages', true)



//Books in array
let myLibrary = [];

//Selectors
const bookCase = document.querySelector('#bookcase');
const newBookButton = document.querySelector('#addBook');
const formClose = document.querySelector('[data-close-button]');
const formBG = document.querySelector('#background');
const formContainer = document.querySelector('#form');


//Open Form
newBookButton.addEventListener('click', () => {
  formContainer.classList.add('active')
  formBG.classList.add('active')
})

//Close Form
formClose.addEventListener('click', closeForm)


formBG.addEventListener('click', closeForm)


function closeForm() {
  formContainer.classList.remove('active')
  formBG.classList.remove('active')
}

//Returning form values

function bTitle() {
  return document.getElementById('bTitle').value;
}

function bAuthor() {
  return document.getElementById('bAuthor').value;
}

function bPages() {
  return document.getElementById('bPages').value;
}

const radioVal = document.getElementsByName('haveRead');
function haveRead() {
  if (radioVal[0].checked) {
    return true
  } else if (radioVal[1].checked) {
    return false
  }
}


//Create new book and add to library
function addBookToLibrary() {
  let aNewBook = new Book(bTitle(), bAuthor(), bPages(), haveRead())
  myLibrary.push(aNewBook);
  console.table(myLibrary);
}


function updateDisplay() {
  bookCase.textContent = '';
  displayBooks()
}

//Display myLibrary on page
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const bookPlate = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readDiv = document.createElement('div');

    bookCase.appendChild(bookPlate).setAttribute('class', 'bookPlates delete' + i)

    bookPlate.appendChild(titleDiv);
    titleDiv.textContent += myLibrary[i].title;

    bookPlate.appendChild(authorDiv);
    authorDiv.textContent += myLibrary[i].author;

    bookPlate.appendChild(pagesDiv);
    pagesDiv.textContent += myLibrary[i].pages;

    bookPlate.appendChild(readDiv);
    const readButton = document.createElement('button');
    readDiv.appendChild(readButton)
    if (myLibrary[i].haveread == true) {
      readButton.innerHTML = 'Have Read'
    } else if (myLibrary[i].haveread == false) {
      readButton.innerHTML = 'Not Read'
    }
    readButton.addEventListener('click', () => {
      if (myLibrary[i].haveread === true) {
        myLibrary[i].haveread = false;
        readButton.innerHTML = 'Not Read';
      } else if (myLibrary[i].haveread === false) {
        myLibrary[i].haveread = true;
        readButton.HTML = 'Have Read';
      }
      updateDisplay();
    })


    const closeButton = document.createElement('button')
    bookPlate.appendChild(closeButton).innerHTML = "Remove"
    closeButton.addEventListener('click', () => {
      myLibrary.splice(i, 1)
      updateDisplay();
    })
  }
}

///Get Values from form, create book, update display

formContainer.addEventListener('submit', (e) => {
  formContainer.classList.remove('active')
  formBG.classList.remove('active')
  addBookToLibrary();
  updateDisplay();
  document.querySelector('.form-content').reset()

});









// //Display stored data in myLibray
// if (!localStorage.getItem('myLibrary')) {
//   updateDisplay();
// } else {
//   saveData();
//   updateDisplay();
// }

// //Save myLibrary to storage
// function saveData() {
//   localStorage.setItem('myLibrary', myLibrary);
// }

// //myLibrary.onchange = saveData;


function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
  if(!localStorage.myLibrary) {
    updateDisplay();
  } else {
    let objects = localStorage.getItem('myLibrary')
    objects = JSON.parse(objects);
    myLibrary = objects;
    updateDisplay()
  }
}

restore();