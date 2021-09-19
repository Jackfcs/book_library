import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
  query,
  firestore,
  deleteDoc
} from "firebase/firestore";
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBI7A0pW5xMqxuwq5uGkrNtovA0G6R1sD4",

  authDomain: "book-library-33988.firebaseapp.com",

  projectId: "book-library-33988",

  storageBucket: "book-library-33988.appspot.com",

  messagingSenderId: "280691110689",

  appId: "1:280691110689:web:5f9cad2b2e905cd6f00460",

  measurementId: "G-K5STZCKJTS",
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
getCities(db)

// try {
//   const docRef = await addDoc(collection(db, "library"), {book: "A test"});
//   console.log(docRef.id)
// } catch (e) {
//   console.error("Error")
// }






//The Constructor
function Book(title, author, pages, haveread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveread = haveread;
  this.info = function () {
    return title + " by " + author + ", " + pages + " long."; // + haveread
  };
}

//Creating book objects using constructor
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", "295 pages", true);
//const theHabbit = new Book('The Hobbit', 'J.R.R. Tolkein', '295 pages', true)

//Books in array
let myLibrary = [theHobbit];



//Selectors
const bookCase = document.querySelector("#bookcase");
const newBookButton = document.querySelector("#addBook");
const formClose = document.querySelector("[data-close-button]");
const formBG = document.querySelector("#background");
const formContainer = document.querySelector("#form");
const bAuthorValue = document.getElementById("bAuthor");
const bTitleValue = document.getElementById("bTitle");
const bPagesValue = document.getElementById("bPages");

//Open Form
newBookButton.addEventListener("click", () => {
  formContainer.classList.add("active");
  formBG.classList.add("active");
});

//Close Form
formClose.addEventListener("click", closeForm);

formBG.addEventListener("click", closeForm);

function closeForm() {
  formContainer.classList.remove("active");
  formBG.classList.remove("active");
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

const radioVal = document.getElementsByName("haveRead");
function haveRead() {
  if (radioVal[0].checked) {
    return true;
  } else if (radioVal[1].checked) {
    return false;
  }
}

const form = document.getElementById("form-firebase");

//Saving Data
//Create new book and add to library
function addBookToLibrary() {
  let aNewBook = new Book(bTitle(), bAuthor(), bPages(), haveRead());
  myLibrary.push(aNewBook);

  // try {
  //   const docRef = addDoc(collection(db, "library"), aNewBook);
  //   console.log(docRef.id);
  // } catch (e) {
  //   console.error("Error", e);
  // }

  addDoc(collection(db, 'library'), {
    title: bTitle(),
    author: bAuthor(), 
    pages: bPages(),
    haveRead: haveRead(),
  })

}



// //Retrieve from db once

// const querySnapshot = await getDocs(collection(db, "library"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id);
//   console.log(doc.data().haveRead)
//   renderBooks(doc)
// });

//real-time listener
const q = query(collection(db, "library"));
const unsub = onSnapshot(q, (querySnapshot) => {
  bookCase.innerHTML = "";
  console.log(querySnapshot.docChanges())
  querySnapshot.forEach((doc) => {
    console.log(doc.data())
    
    renderBooks(doc)
  })
})

// db.collection("library").onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   console.log(changes)
// })



function renderBooks(doc){
  
  const bookPlate = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const pagesDiv = document.createElement("div");
  const readDiv = document.createElement("div");
  const removeDiv = document.createElement("div");
  
  bookCase
    .appendChild(bookPlate)
    .setAttribute("class", "bookPlates");

  bookPlate.setAttribute("data-id", doc.id)

  bookPlate.appendChild(titleDiv);
  titleDiv.textContent += doc.data().title;

  bookPlate.appendChild(authorDiv);
  authorDiv.textContent += doc.data().author;

  bookPlate.appendChild(pagesDiv);
  pagesDiv.textContent = doc.data().pages + " pages";

  bookPlate.appendChild(readDiv);
  const readButton = document.createElement("button");
  readDiv.appendChild(readButton).setAttribute("class", "haveread-button");
  if (doc.data().haveread) {
    readButton.innerHTML = "Have Read";
    readButton.style.background = "rgb(250 195 96)";
  } else if (doc.data().haveread == false) {
    readButton.innerHTML = "Not Read";
  }
  readButton.addEventListener("click", () => {
    if (doc.data().haveread) {
      doc.haveread = false;
      readButton.innerHTML = "Not Read";
    } else if (doc.data().haveread === false) {
      doc.haveread = true;
      readButton.HTML = "Have Read";
    }
    //updateDisplay();
    saveLibrary();
  });

  const removeButton = document.createElement("button");
  bookPlate.appendChild(removeDiv).setAttribute("class", "removebookbutton");
  removeDiv.appendChild(removeButton).innerHTML = "Remove";
  let id = doc.id
  async function deleteBook () {
    //await deleteDoc(doc(db, "Library", id))
    console.log(id)
    console.log(firestore)
  }

  removeButton.addEventListener("click", deleteBook);
}

//await deleteDoc(doc(db, "library", "dTzSZOFJ235ZDGGJDHEg"))

function updateDisplay() {
  //bookCase.textContent = "";
  //displayBooks();
}

//Display myLibrary on page
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const bookPlate = document.createElement("div");
    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    const pagesDiv = document.createElement("div");
    const readDiv = document.createElement("div");
    const removeDiv = document.createElement("div");

    bookCase
      .appendChild(bookPlate)
      .setAttribute("class", "bookPlates delete" + i);

    bookPlate.appendChild(titleDiv);
    titleDiv.textContent += myLibrary[i].title;

    bookPlate.appendChild(authorDiv);
    authorDiv.textContent += myLibrary[i].author;

    bookPlate.appendChild(pagesDiv);
    pagesDiv.textContent = myLibrary[i].pages + " pages";

    bookPlate.appendChild(readDiv);
    const readButton = document.createElement("button");
    readDiv.appendChild(readButton).setAttribute("class", "haveread-button");
    if (myLibrary[i].haveread == true) {
      readButton.innerHTML = "Have Read";
      readButton.style.background = "rgb(250 195 96)";
    } else if (myLibrary[i].haveread == false) {
      readButton.innerHTML = "Not Read";
    }
    readButton.addEventListener("click", () => {
      if (myLibrary[i].haveread === true) {
        myLibrary[i].haveread = false;
        readButton.innerHTML = "Not Read";
      } else if (myLibrary[i].haveread === false) {
        myLibrary[i].haveread = true;
        readButton.HTML = "Have Read";
      }
      updateDisplay();
      saveLibrary();
    });

    const removeButton = document.createElement("button");
    bookPlate.appendChild(removeDiv).setAttribute("class", "removebookbutton");
    removeDiv.appendChild(removeButton).innerHTML = "Remove";
    removeButton.addEventListener("click", () => {
      
      myLibrary.splice(i, 1);
    //updateDisplay();
    saveLibrary();
    });
  }
}

///Get Values from form, create book, update display

formContainer.addEventListener("submit", (e) => {
  formContainer.classList.remove("active");
  formBG.classList.remove("active");
  addBookToLibrary();
  updateDisplay();
  document.querySelector(".form-content").reset();
  saveLibrary();
});

updateDisplay();

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

if (!localStorage.myLibrary) {
  updateDisplay();
} else {
  myLibrary = JSON.parse(window.localStorage.getItem("myLibrary"));
  updateDisplay();
}
