const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   // return res.status(300).json({message: "Yet to be implemented"});
//   return res.status(200).json(books); 
// });

// public_users.get('/',async function (req, res) {
//   const fetchBooks = () => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (books) {
//           resolve(books);
//         } else {
//           reject("No books available");
//         }
//       }, 100);
//     });
//   };

//   try {
//     const bookList = await fetchBooks();
//     return res.status(200).json(bookList);
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// });

public_users.get('/', function (req, res) { 
  const getBooks = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (books) {
        resolve(books);
      } else {
        reject("No books found");
      }
    }, 100); // 
  });

  getBooks
    .then((bookList) => {
      return res.status(200).json(bookList);
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
});




// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   //return res.status(300).json({message: "Yet to be implemented"});
//   const isbn = req.params.isbn;
//   const book = books[isbn];
//   if (book) {
//     return res.status(200).json(book);
//   } else {
//     return res.status(404).json({ message: "Book not found" });
//   }
//  });
  
// Task 11 Use Promise
// public_users.get('/isbn/:isbn', function (req, res) {
//   const isbn = req.params.isbn;

//   const getBookByISBN = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const book = books[isbn];
//       if (book) {
//         resolve(book);
//       } else {
//         reject("Book not found for ISBN: " + isbn);
//       }
//     }, 200); 
//   });

//   getBookByISBN
//     .then((book) => {
//       return res.status(200).json(book);
//     })
//     .catch((error) => {
//       return res.status(404).json({ message: error });
//     });
// });

// Task 11 async/await
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  const fetchBookByISBN = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found for ISBN: " + isbn);
        }
      }, 100);
    });
  };

  try {
    const book = await fetchBookByISBN();
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});




// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   // return res.status(300).json({message: "Yet to be implemented"});
//   const author = req.params.author.toLowerCase();
//   const filteredBooks = Object.values(books).filter(book =>
//     book.author.toLowerCase().includes(author)
//   );

//   if (filteredBooks.length > 0) {
//     return res.status(200).json(filteredBooks);
//   } else {
//     return res.status(404).json({ message: "No books found for this author" });
//   }
// });

// Task 12 
// public_users.get('/author/:author', function (req, res) {
//   const author = req.params.author.toLowerCase(); 
//   const getBooksByAuthor = new Promise((resolve, reject) => {
//     setTimeout(() => { 
//       const filteredBooks = Object.values(books).filter(book =>
//         book.author.toLowerCase().includes(author)
//       ); 
//       if (filteredBooks.length > 0) {
//         resolve(filteredBooks);
//       } else {
//         reject("No books found for author: " + author);
//       }
//     }, 100);  
//   }); 
//   getBooksByAuthor
//     .then((filteredBooks) => {
//       return res.status(200).json(filteredBooks);
//     })
//     .catch((error) => {
//       return res.status(404).json({ message: error });
//     });
// });

// Task 12 
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author.toLowerCase();

  const fetchBooksByAuthor = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredBooks = Object.values(books).filter(book =>
          book.author.toLowerCase().includes(author)
        );

        if (filteredBooks.length > 0) {
          resolve(filteredBooks);
        } else {
          reject("No books found for author: " + author);
        }
      }, 100);
    });
  };

  try {
    const filteredBooks = await fetchBooksByAuthor();
    return res.status(200).json(filteredBooks);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});





// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   // return res.status(300).json({message: "Yet to be implemented"});
//   const title = req.params.title.toLowerCase();
//   const filteredBooks = Object.values(books).filter(book =>
//     book.title.toLowerCase().includes(title)
//   );

//   if (filteredBooks.length > 0) {
//     return res.status(200).json(filteredBooks);
//   } else {
//     return res.status(404).json({ message: "No books found with this title" });
//   }
// });

// Task 13 Promise 
// public_users.get('/title/:title', function (req, res) {
//   const title = req.params.title.toLowerCase();

//   const getBooksByTitle = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const filteredBooks = Object.values(books).filter(book =>
//         book.title.toLowerCase().includes(title)
//       );

//       if (filteredBooks.length > 0) {
//         resolve(filteredBooks);
//       } else {
//         reject("No books found with title: " + title);
//       }
//     }, 100);  
//   });

//   getBooksByTitle
//     .then(books => res.status(200).json(books))
//     .catch(error => res.status(404).json({ message: error }));
// });

// Task 13 async/await 
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title.toLowerCase();

  const fetchBooksByTitle = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredBooks = Object.values(books).filter(book =>
          book.title.toLowerCase().includes(title)
        );

        if (filteredBooks.length > 0) {
          resolve(filteredBooks);
        } else {
          reject("No books found with title: " + title);
        }
      }, 100);
    });
  };

  try {
    const results = await fetchBooksByTitle();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});






//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
