import React, { useEffect, useState, useCallback } from 'react'

import api from './services/api'

import './App.css'

import logo from './assets/logo.png'

const TITLEASC = "TitleAscending"
const TITLEDESC = "TitleDescending"
const AUTHORASC = "AuthorAscending"
const AUTHORDESC = "AuthorDescending"
const EDITIONDESC = "EditionDescending"

const Table = () => {
    const [books, setBooks] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        async function loadBooks() {
            const response = await api.get('/books', {})
            setBooks(response.data)
        } loadBooks()
    })

    const titleAscending = useCallback((a, b) => {
        const bookA = a.title.toUpperCase()
        const bookB = b.title.toUpperCase()
        let compare = 0
        if (bookA > bookB) {
            compare = 1
        } else if (bookA < bookB) {
            compare = -1
        }
        return compare
    }, [])

    const titleDescending = useCallback((a, b) => {
        const bookA = a.title.toUpperCase()
        const bookB = b.title.toUpperCase()
        let compare = 0
        if (bookA < bookB) {
            compare = 1
        } else if (bookA > bookB) {
            compare = -1
        }
        return compare
    }, [])

    const authorAscending = useCallback((a, b) => {
        const bookA = a.author.toUpperCase()
        const bookB = b.author.toUpperCase()
        let compare = 0
        if (bookA > bookB) {
            compare = 1
        } else if (bookA < bookB) {
            compare = -1
        }
        return compare
    }, [])

    const authorDescending = useCallback((a, b) => {
        const bookA = a.author.toUpperCase()
        const bookB = b.author.toUpperCase()
        let compare = 0
        if (bookA < bookB) {
            compare = 1
        } else if (bookA > bookB) {
            compare = -1
        }
        return compare
    }, [])

    const editionDescending = useCallback((a, b) => {
        const bookA = a.edition_year
        const bookB = b.edition_year
        let compare = 0
        if (bookA < bookB) {
            compare = 1
        } else if (bookA > bookB) {
            compare = -1
        }
        return compare
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
                books.sort(titleAscending)
                return (
                    listBooks()
                )
            case TITLEDESC:
                books.sort(titleDescending)
                return (
                    listBooks()
                )
            case AUTHORASC:
                books.sort(authorAscending)
                return (
                    listBooks()
                )
            case AUTHORDESC:
                books.sort(authorDescending)
                return (
                    listBooks()
                )
            case EDITIONDESC:
                books.sort(editionDescending)
                return (
                    listBooks()
                )
            default:
                return (
                    listBooks()
                )
        }
    }, [books, status, titleAscending, titleDescending, authorAscending, authorDescending, editionDescending, listBooks])

    return (
        <div>
            <header className="app-header">
                <img src={logo} alt="logo" />
            </header>
            <div className="container-buttons" >
                <button className="button" type="button" placeholder="Title Ascending" onClick={setTitleAscending}>Title Ascending</button>
                <button className="button" type="button" placeholder="Title Descending" onClick={setTitleDescending}>Title Descending</button>
                <button className="button" type="button" placeholder="Author Ascending" onClick={setAuthorAscending}>Author Ascending</button>
                <button className="button" type="button" placeholder="Author Descending" onClick={setAuthorDescending}>Author Descending</button>
                <button className="button" type="button" placeholder="Edition Year" onClick={setEditionDescending}>Edition Year Descending</button>
            </div>
            <div className="grid-container-header">
                <div className="grid-item"></div>
                <div className="grid-item">
                    <p className="grid-p">Title Ascending</p>
                </div>
                <div className="grid-item">
                    <p className="grid-p">Title Descending</p>
                </div>
                <div className="grid-item">
                    <p className="grid-p">Author Ascending</p>
                </div>
                <div className="grid-item">
                    <p className="grid-p">Author Descending</p>
                </div>
                <div className="grid-item">
                    <p className="grid-p">Edition Year</p>
                </div>
            </div>
            {renderTable()}
        </div>
    )
}
export default Table