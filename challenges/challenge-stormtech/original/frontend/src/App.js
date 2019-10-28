import React, { useEffect, useState } from 'react';
import './App.css';

import api from './services/api';

import logo from './assets/logo.png'

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      const response = await api.get('/books', {})
      setBooks(response.data)
    } loadBooks();
  });

  function titleAscending(a, b) {
    const bookA = a.title.toUpperCase();
    const bookB = b.title.toUpperCase();

    let compare = 0;
    if (bookA > bookB) {
      compare = 1;
    } else if (bookA < bookB) {
      compare = -1;
    }
    return compare;
  }
  function titleDescending(a, b) {
    const bookA = a.title.toUpperCase();
    const bookB = b.title.toUpperCase();

    let compare = 0;
    if (bookA < bookB) {
      compare = 1;
    } else if (bookA > bookB) {
      compare = -1;
    }
    return compare;
  }
  function authorAscending(a, b) {
    const bookA = a.author.toUpperCase();
    const bookB = b.author.toUpperCase();

    let compare = 0;
    if (bookA > bookB) {
      compare = 1;
    } else if (bookA < bookB) {
      compare = -1;
    }
    return compare;
  }
  function authorDescending(a, b) {
    const bookA = a.author.toUpperCase();
    const bookB = b.author.toUpperCase();

    let compare = 0;
    if (bookA < bookB) {
      compare = 1;
    } else if (bookA > bookB) {
      compare = -1;
    }
    return compare;
  }
  function editionDescending(a, b) {
    const bookA = a.edition_year;
    const bookB = b.edition_year;

    let compare = 0;
    if (bookA < bookB) {
      compare = 1;
    } else if (bookA > bookB) {
      compare = -1;
    }
    return compare;
  }

  function listBooks(book) {
    let newOrder = ""
    for (let i = 0; i < book.length; i++) {
      let valorEsperado = book[i].id
      newOrder += valorEsperado
      if (i < book.length - 1) {
        newOrder += ", "
      }
    }
    console.log("New Order of Books - ", newOrder, '\n')
  }

  function ShowByTitleAscending() {
    let book = books
    book.sort(titleAscending)
    listBooks(book)
    return book
  }
  function ShowByTitleDescending() {
    let book = books
    book.sort(titleDescending)
    listBooks(book)
    return book
  }
  function ShowByAuthorAscending() {
    let book = books
    book.sort(authorAscending)
    listBooks(book)
    return book
  }
  function ShowByAuthorDescending() {
    let book = books
    book.sort(authorDescending)
    listBooks(book)
    return book
  }
  function ShowByEditionDescending() {
    let book = books
    book.sort(editionDescending)
    listBooks(book)
    return book
  }

  function OrderByFirstScenario() {
    let book = books
    book.sort(titleAscending)
    listBooks(book)
    return book
  }
  function OrderBySecondScenario() {
    let book = books
    book.sort(titleDescending)
    book.sort(authorAscending)
    listBooks(book)
    return book
  }
  function OrderByThirdScenario() {
    let book = books
    book.sort(titleAscending)
    book.sort(authorDescending)
    book.sort(editionDescending)

    listBooks(book)
    return book
  }
  function OrderByFourthScenario() {
    let book = null

    alert('Sorting Service Exception')
    return book
  }
  function OrderByFifthScenario() {
    let book = []

    listBooks(book)
    return book
  }

  return (
    <>
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
      <div className="App">
        <button className="App-table-button" type="submit" placeholder="Title Descending" onClick={ShowByTitleAscending}>Title Ascending</button>
        <button className="App-table-button" type="submit" placeholder="Title Descending" onClick={ShowByTitleDescending}>Title Descending</button>
        <button className="App-table-button" type="submit" placeholder="Author Ascending" onClick={ShowByAuthorAscending}>Author Ascending</button>
        <button className="App-table-button" type="submit" placeholder="Author Descending" onClick={ShowByAuthorDescending}>Author Descending</button>
        <button className="App-table-button" type="submit" placeholder="Edition Descending" onClick={ShowByEditionDescending}>Edition Descending</button>
        <p><strong>Click the headers to sort the table.</strong></p>
        <p>The first time you click, the sorting direction is ascending (A to Z).</p>
        <p>Click again, and the sorting direction will be descending (Z to A):</p>
        <table className="App-table" id="myTable">
          <thead>
            <tr>
              <th></th>
              <th onClick={ShowByTitleAscending}>
                Title
              </th>
              <th>
                Author
              </th>
              <th>Edition Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>
                  Book {book.id}
                </td>
                <td>
                  {book.title}
                </td>
                <td>
                  {book.author}
                </td>
                <td>
                  {book.edition_year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="App-button" type="submit" placeholder="First Scenario" onClick={OrderByFirstScenario}>First Scenario</button>
        <button className="App-button" type="submit" placeholder="Second Scenario" onClick={OrderBySecondScenario}>Second Scenario</button>
        <button className="App-button" type="submit" placeholder="Third Scenario" onClick={OrderByThirdScenario}>Third Scenario</button>
        <button className="App-button" type="submit" placeholder="Fourth Scenario" onClick={OrderByFourthScenario}>Fourth Scenario</button>
        <button className="App-button" type="submit" placeholder="Fifth Scenario" onClick={OrderByFifthScenario}>Fifth Scenario</button>

        <table className="App-table" >
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Edition Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>
                  Book {book.id}
                </td>
                <td>
                  {book.title}
                </td>
                <td>
                  {book.author}
                </td>
                <td>
                  {book.edition_year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
}