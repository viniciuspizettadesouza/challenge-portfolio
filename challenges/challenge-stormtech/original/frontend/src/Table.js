import React, { useEffect, useState, useCallback } from 'react';

import api from './services/api';

import './App.css'

import logo from './assets/logo.png'

const TITLEASC = "TitleAscending"
const TITLEDESC = "TitleDescending"
const AUTHORASC = "AuthorAscending"
const AUTHORDESC = "AuthorDescending"
const EDITIONDESC = "EditionDescending"

const Table = () => {
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
            <div className="grid-container" key={book._id}>
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

    const setTitleAscending = useCallback(() => {
        setStatus(TITLEASC)
    }, [])
    const setTitleDescending = useCallback(() => {
        setStatus(TITLEDESC)
    }, [])
    const setAuthorAscending = useCallback(() => {
        setStatus(AUTHORASC)
    }, [])
    const setAuthorDescending = useCallback(() => {
        setStatus(AUTHORDESC)
    }, [])
    const setEditionDescending = useCallback(() => {
        setStatus(EDITIONDESC)
    }, [])

    const renderTable = useCallback(() => {
        switch (status) {
            case TITLEASC:
                return (
                    books.sort(titleAscending)
                    &&
                    listBooks()
                )
            case TITLEDESC:
                return (
                    books.sort(titleDescending)
                    &&
                    listBooks()
                )
            case AUTHORASC:
                return (
                    books.sort(authorAscending)
                    &&
                    listBooks()
                )
            case AUTHORDESC:
                return (
                    books.sort(authorDescending)
                    &&
                    listBooks()
                )
            case EDITIONDESC:
                return (
                    books.sort((a, b) => (a.edition_year > b.edition_year) ? 1 : ((a.edition_year < b.edition_year) ? -1 : 0))
                    &&
                    listBooks()
                )
            default:
                return (
                    listBooks()
                )
        }
    }, [books, status, titleAscending, titleDescending, authorAscending, authorDescending, listBooks])

    return (
        <div>
            <header className="app-header">
                <img src={logo} alt="logo" />
            </header>
            <div className="grid-container-header">
                <div className="grid-item"></div>
                <button className="grid-button" onClick={setTitleAscending}>
                    <p className="grid-button-p">Title Ascending</p>
                </button>
                <button className="grid-button" onClick={setTitleDescending}>
                    <p className="grid-button-p">Title Descending</p>
                </button>
                <button className="grid-button" onClick={setAuthorAscending}>
                    <p className="grid-button-p">Author Ascending</p>
                </button>
                <button className="grid-button" onClick={setAuthorDescending}>
                    <p className="grid-button-p">Author Descending</p>
                </button>
                <button className="grid-button" onClick={setEditionDescending}>
                    <p className="grid-button-p">Edition Year</p>
                </button>
            </div>
            {renderTable()}
        </div>
    )
}
export default Table