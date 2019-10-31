import React, { useEffect, useState, useCallback } from 'react';

import api from './services/api';

import './App.css'

const FIRSTSCENARIO = "FirstScenario"
const SECONDSCENARIO = "SecondScenario"
const THIRDSCENARIO = "ThirdScenario"
const FOURTHSCENARIO = "FourthScenario"
const FIFTHSCENARIO = "FifthScenario"

const TableScenarios = () => {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState('')

    useEffect(() => {
        async function loadBooks() {
            const response = await api.get('/books', {})
            setBooks(response.data)
        } loadBooks();
    });

    const titleAscending = useCallback((a, b) => {
        const bookA = a.title.toUpperCase();
        const bookB = b.title.toUpperCase();
        let compare = 0;
        if (bookA > bookB) {
            compare = 1;
        } else if (bookA < bookB) {
            compare = -1;
        }
        return compare;
    }, [])

    const titleDescending = useCallback((a, b) => {
        const bookA = a.title.toUpperCase();
        const bookB = b.title.toUpperCase();
        let compare = 0;
        if (bookA < bookB) {
            compare = 1;
        } else if (bookA > bookB) {
            compare = -1;
        }
        return compare;
    }, [])

    const authorAscending = useCallback((a, b) => {
        const bookA = a.author.toUpperCase();
        const bookB = b.author.toUpperCase();
        let compare = 0;
        if (bookA > bookB) {
            compare = 1;
        } else if (bookA < bookB) {
            compare = -1;
        }
        return compare;
    }, [])

    const authorDescending = useCallback((a, b) => {
        const bookA = a.author.toUpperCase();
        const bookB = b.author.toUpperCase();
        let compare = 0;
        if (bookA < bookB) {
            compare = 1;
        } else if (bookA > bookB) {
            compare = -1;
        }
        return compare;
    }, [])

    const listBooks = useCallback(() =>
        books.map(book => (
            <div className="grid-container-scenarios" key={book._id}>
                <div className="grid-item">
                    <p className="grid-item-p">{book.id}</p>
                </div>
                <div className="grid-item">
                    <p className="grid-item-p">{book.title}</p>
                </div>
                <div className="grid-item">
                    <p className="grid-item-p">{book.author}</p>
                </div>
                <div className="grid-item">
                    <p className="grid-item-p">{book.edition_year}</p>
                </div>
            </div>
        )), [books])

    const OrderByFirstScenario = useCallback(() => {
        setStatus(FIRSTSCENARIO)
    }, [])
    const OrderBySecondScenario = useCallback(() => {
        setStatus(SECONDSCENARIO)
    }, [])
    const OrderByThirdScenario = useCallback(() => {
        setStatus(THIRDSCENARIO)
    }, [])
    const OrderByFourthScenario = useCallback(() => {
        setStatus(FOURTHSCENARIO)
    }, [])
    const OrderByFifthScenario = useCallback(() => {
        setStatus(FIFTHSCENARIO)
    }, [])

    const renderScenarios = useCallback(() => {
        switch (status) {

            case FIRSTSCENARIO:
                return (
                    books.sort(titleAscending)
                    &&
                    listBooks()
                )
            case SECONDSCENARIO:
                return (
                    books.sort(titleDescending) &&
                    books.sort(authorAscending) &&
                    listBooks()
                )
            case THIRDSCENARIO:
                return (
                    books.sort(titleDescending) &&
                    books.sort(authorDescending) &&
                    books.sort((a, b) => (a.edition_year > b.edition_year) ? 1 : ((a.edition_year < b.edition_year) ? -1 : 0)) &&
                    listBooks()
                )
            case FOURTHSCENARIO:
                return (
                    'FOURTHSCENARIO'
                )
            case FIFTHSCENARIO:
                return (
                    'FIFTHSCENARIO'
                )
            default:
                return (
                    listBooks()
                )
        }
    }, [books, status, titleAscending, titleDescending, authorAscending, authorDescending, listBooks])

    return (
        <div>
            <button className="App-button" type="button" placeholder="First Scenario" onClick={OrderByFirstScenario}>First Scenario</button>
            <button className="App-button" type="button" placeholder="Second Scenario" onClick={OrderBySecondScenario}>Second Scenario</button>
            <button className="App-button" type="button" placeholder="Third Scenario" onClick={OrderByThirdScenario}>Third Scenario</button>
            <button className="App-button" type="button" placeholder="Fourth Scenario" onClick={OrderByFourthScenario}>Fourth Scenario</button>
            <button className="App-button" type="button" placeholder="Fifth Scenario" onClick={OrderByFifthScenario}>Fifth Scenario</button>

            <div className="grid-scenarios-header">
                <div className="grid-item"></div>
                <div className="grid-item">
                    <p className="grid-button-p">Title</p>
                </div>
                <div className="grid-item">
                    <p className="grid-button-p">Author</p>
                </div>
                <div className="grid-button">
                    <p className="grid-button-p">Edition Year</p>
                </div>
            </div>
            {renderScenarios()}
        </div>
    )
}
export default TableScenarios