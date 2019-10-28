import React, { useEffect, useState } from 'react';

import api from './services/api';

import './App.css';

import logo from './assets/logo.png'


export default function Table() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      const response = await api.get('/books', {})
      setBooks(response.data)
    } loadBooks();
  });

  function titleAscending(a, b) {
    let bookA = a.title.toUpperCase();
    let bookB = b.title.toUpperCase();

    let compare = 0;
    if (bookA > bookB) {
      compare = 1;
    } else if (bookA < bookB) {
      compare = -1;
    }
    return compare;
  }
  function titleDescending(a, b) {
    let bookA = a.title.toUpperCase();
    let bookB = b.title.toUpperCase();

    let compare = 0;
    if (bookA < bookB) {
      compare = 1;
    } else if (bookA > bookB) {
      compare = -1;
    }
    return compare;
  }
  function authorAscending(a, b) {
    let bookA = a.author.toUpperCase();
    let bookB = b.author.toUpperCase();

    let compare = 0;
    if (bookA > bookB) {
      compare = 1;
    } else if (bookA < bookB) {
      compare = -1;
    }
    return compare;
  }
  function authorDescending(a, b) {
    let bookA = a.author.toUpperCase();
    let bookB = b.author.toUpperCase();

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
  }
  function ShowByTitleDescending() {
    let book = books
    book.sort(titleDescending)
    listBooks(book)
  }
  function ShowByAuthorAscending() {
    let book = books
    book.sort(authorAscending)
    listBooks(book)
  }
  function ShowByAuthorDescending() {
    let book = books
    book.sort(authorDescending)
    listBooks(book)
  }
  function ShowByEditionDescending() {
    let book = books
    book.sort((a, b) => (a.edition_year > b.edition_year) ? 1 : ((a.edition_year < b.edition_year) ? -1 : 0));
    listBooks(book)
    setBooks(book)
  }

  function OrderByFirstScenario() {
    let book = books
    book.sort(titleAscending)

    listBooks(book)
  }

  function OrderBySecondScenario() {
    let book = books
    book.sort(titleDescending)
    book.sort(authorAscending)
    listBooks(book)
  }
  function OrderByThirdScenario() {
    let book = books
    book.sort(titleAscending)
    book.sort(authorDescending)
    book.sort((a, b) => (a.edition_year > b.edition_year) ? 1 : ((a.edition_year < b.edition_year) ? -1 : 0));
    listBooks(book)
  }
  function OrderByFourthScenario() {
    try {
      let book = null
      book.sort()
    } catch{
      alert('Sorting Service Exception')
      throw new Error('Sorting Service Exception')
    }

  }
  function OrderByFifthScenario() {
    let book = []

    listBooks(book)
  }

  return (
    <>
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
      <div className="App">
        <button className="App-table-button" type="button" placeholder="Title Descending" onClick={ShowByTitleAscending}>Title Ascending</button>
        <button className="App-table-button" type="button" placeholder="Title Descending" onClick={ShowByTitleDescending}>Title Descending</button>
        <button className="App-table-button" type="button" placeholder="Author Ascending" onClick={ShowByAuthorAscending}>Author Ascending</button>
        <button className="App-table-button" type="button" placeholder="Author Descending" onClick={ShowByAuthorDescending}>Author Descending</button>
        <button className="App-table-button" type="button" placeholder="Edition Descending" onClick={ShowByEditionDescending}>Edition Descending</button>
        <p><strong>Click the headers to sort the table.</strong></p>
        <p>The first time you click, the sorting direction is ascending (A to Z).</p>
        <p>Click again, and the sorting direction will be descending (Z to A):</p>
        <table className="App-table">
          <thead>
            <tr>
              <th></th>
              <th onClick={ShowByTitleAscending}>
                Title
              </th>
              <th onClick={ShowByAuthorAscending}>
                Author
              </th>
              <th onClick={ShowByEditionDescending}>
                Edition Year
              </th>
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
        <button className="App-button" type="button" placeholder="First Scenario" onClick={OrderByFirstScenario}>First Scenario</button>
        <button className="App-button" type="button" placeholder="Second Scenario" onClick={OrderBySecondScenario}>Second Scenario</button>
        <button className="App-button" type="button" placeholder="Third Scenario" onClick={OrderByThirdScenario}>Third Scenario</button>
        <button className="App-button" type="button" placeholder="Fourth Scenario" onClick={OrderByFourthScenario}>Fourth Scenario</button>
        <button className="App-button" type="button" placeholder="Fifth Scenario" onClick={OrderByFifthScenario}>Fifth Scenario</button>

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