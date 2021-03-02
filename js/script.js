
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
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', '295 pages', true)
//const theHabbit = new Book('The Hobbit', 'J.R.R. Tolkein', '295 pages', true)



//Books in array
let myLibrary = [theHobbit];

//Selectors
const bookCase = document.querySelector('#bookcase');
const newBookButton = document.querySelector('#addBook');
const formClose = document.querySelector('[data-close-button]');
const formBG = document.querySelector('#background');
const formContainer = document.querySelector('#form');
const bAuthorValue = document.getElementById('bAuthor');
const bTitleValue = document.getElementById('bTitle');
const bPagesValue = document.getElementById('bPages');


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
  return bTitleValue.value;
}

function bAuthor() {
  return bAuthorValue.value;
}

function bPages() {
  return bPagesValue.value;
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
}


function updateDisplay() {
  bookCase.textContent = '';
  displayBooks();
}

//Display myLibrary on page
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const bookPlate = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readDiv = document.createElement('div');
    const removeDiv = document.createElement('div');

    bookCase.appendChild(bookPlate).setAttribute('class', 'bookPlates delete' + i)

    bookPlate.appendChild(titleDiv);
    titleDiv.textContent += myLibrary[i].title;

    bookPlate.appendChild(authorDiv);
    authorDiv.textContent += myLibrary[i].author;

    bookPlate.appendChild(pagesDiv);
    pagesDiv.textContent = myLibrary[i].pages + ' pages';

    bookPlate.appendChild(readDiv);
    const readButton = document.createElement('button');
    readDiv.appendChild(readButton).setAttribute('class', 'haveread-button')
    if (myLibrary[i].haveread == true) {
      readButton.innerHTML = 'Have Read'
      readButton.style.background = "rgb(250 195 96)";
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
      saveLibrary()
    })


    const removeButton = document.createElement('button')
    bookPlate.appendChild(removeDiv).setAttribute('class', 'removebookbutton');
    removeDiv.appendChild(removeButton).innerHTML = "Remove"
    removeButton.addEventListener('click', () => {
      myLibrary.splice(i, 1)
      updateDisplay();
      saveLibrary();
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
  saveLibrary();
  
});
updateDisplay()





function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}


if (!localStorage.myLibrary) {
  updateDisplay()
} else {
  myLibrary = JSON.parse(window.localStorage.getItem('myLibrary'));
  updateDisplay()
}