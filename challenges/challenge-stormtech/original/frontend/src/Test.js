import React, { useEffect, useState, useCallback } from 'react';

import api from './services/api';

import './App.css';

import logo from './assets/logo.png'

export default function Test() {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState(books)

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

    function listBooks() {
        books.map(book => (
            <div className="grid-container" key={book._id}>
                <div className="grid-item">
                    <p>{book.id}</p>
                </div>
                <div className="grid-item">
                    <p>{book.title}</p>
                </div>
                <div className="grid-item">
                    <p>{book.author}</p>
                </div>
                <div className="grid-item">
                    <p>{book.edition_year}</p>
                </div>
            </div>
        ))
    }

    const TITLEASC = "TitleAscending"
    const TITLEDESC = "TitleDescending"
    const AUTHORASC = "AuthorAscending"
    const AUTHORDESC = "AuthorDescending"
    const EDITIONDESC = "EditionDescending"

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

    const renderState = useCallback(() => {
        switch (status) {
            case TITLEASC:
                return (
                    <div>
                        {
                            books.sort(titleAscending)
                            &&
                            books.map(book => (
                                <div className="grid-container" key={book._id} >
                                    <div className="grid-item">
                                        <p>{book.id}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.title}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.author}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.edition_year}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            case TITLEDESC:
                return (
                    <div>
                        {
                            books.sort(titleDescending)
                            &&
                            books.map(book => (
                                <div className="grid-container" key={book._id} >
                                    <div className="grid-item">
                                        <p>{book.id}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.title}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.author}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.edition_year}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            case AUTHORASC:
                return (
                    <div>
                        {
                            books.sort(authorAscending)
                            &&
                            books.map(book => (
                                <div className="grid-container" key={book._id} >
                                    <div className="grid-item">
                                        <p>{book.id}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.title}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.author}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.edition_year}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            case AUTHORDESC:
                return (
                    <div>
                        {
                            books.sort(authorDescending)
                            &&
                            books.map(book => (
                                <div className="grid-container" key={book._id} >
                                    <div className="grid-item">
                                        <p>{book.id}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.title}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.author}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.edition_year}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            case EDITIONDESC:
                return (
                    <div>
                        {
                            books.sort((a, b) => (a.edition_year > b.edition_year) ? 1 : ((a.edition_year < b.edition_year) ? -1 : 0))
                            &&
                            books.map(book => (
                                <div className="grid-container" key={book._id} >
                                    <div className="grid-item">
                                        <p>{book.id}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.title}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.author}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.edition_year}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            default:
                return (
                    <div>
                        {
                            books.map(book => (
                                <div className="grid-container" key={book._id} >
                                    <div className="grid-item">
                                        <p>{book.id}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.title}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.author}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{book.edition_year}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
        }
    }, [books, status])

    return (
        <>
            <header className="app-header">
                <img src={logo} alt="logo" />
            </header>

            <div className="grid-container-header">
            
                <div className="grid-item"></div>
                <div className="grid-button" onClick={setTitleAscending}>
                    <p>Title Ascending</p>
                </div>
                <div className="grid-button" onClick={setTitleDescending}>
                    <p>Title Descending</p>
                </div>
                <div className="grid-button" onClick={setAuthorAscending}>
                    <p>Author Ascending</p>
                </div>
                <div className="grid-button" onClick={setAuthorDescending}>
                    <p>Author Descending</p>
                </div>
                <div className="grid-button" onClick={setEditionDescending}>
                    <p>Edition Year</p>
                </div>
            </div>

            {renderState()}
        </>
    );
}