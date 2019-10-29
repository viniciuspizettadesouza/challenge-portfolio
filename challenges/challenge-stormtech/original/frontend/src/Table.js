import React from 'react';

import './App.css';

export default function Table() {

  function OrderByFirstScenario() {
    let book = books
    book.sort(titleAscending)
  }
  function OrderBySecondScenario() {
    let book = books
    book.sort(titleDescending)
    book.sort(authorAscending)
  }
  function OrderByThirdScenario() {
    let book = books
    book.sort(titleAscending)
    book.sort(authorDescending)
    book.sort((a, b) => (a.edition_year > b.edition_year) ? 1 : ((a.edition_year < b.edition_year) ? -1 : 0));
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
      <div className="App">
        <p>Click the headers to sort the table.</p>
        <p>The first time you click, the sorting direction is ascending (A to Z).</p>
        <p>Click again, and the sorting direction will be descending (Z to A):</p>

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