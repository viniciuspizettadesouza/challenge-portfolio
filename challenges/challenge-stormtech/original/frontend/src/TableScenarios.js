import React, { useEffect, useState, useCallback } from 'react'

import api from './services/api'

import './App.css'

const FIRSTSCENARIO = "FirstScenario"
const SECONDSCENARIO = "SecondScenario"
const THIRDSCENARIO = "ThirdScenario"
const FOURTHSCENARIO = "FourthScenario"
const FIFTHSCENARIO = "FifthScenario"

const TableScenarios = () => {
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
                books.sort(titleAscending)
                return (
                    listBooks()
                )
            case SECONDSCENARIO:
                books.sort(titleDescending)
                books.sort(authorAscending)
                return (
                    listBooks()
                )
            case THIRDSCENARIO:
                books.sort(titleAscending)
                books.sort(authorDescending)
                books.sort(editionDescending)
                return (
                    listBooks()
                )
            case FOURTHSCENARIO:
                return (
                    books.map(book => (
                        <div className="grid-container-scenarios" key={book._id}>
                            <div className="grid-item">
                                <p className="grid-item-p">-</p>
                            </div>
                            <div className="grid-item">
                                <p className="grid-item-p">-</p>
                            </div>
                            <div className="grid-item">
                                <p className="grid-item-p">-</p>
                            </div>
                            <div className="grid-item">
                                <p className="grid-item-p">-</p>
                            </div>
                        </div>
                    ))
                )


            case FIFTHSCENARIO:
                return (
                    []
                )

            default:
                return (
                    listBooks()
                )
        }
    }, [books, status, listBooks, authorAscending, authorDescending, titleAscending, titleDescending, editionDescending])

    return (
        <div className="container-scenarios">
            <div className="container-buttons" >
                <button className="button" type="button" placeholder="First Scenario" onClick={OrderByFirstScenario}>First Scenario</button>
                <button className="button" type="button" placeholder="Second Scenario" onClick={OrderBySecondScenario}>Second Scenario</button>
                <button className="button" type="button" placeholder="Third Scenario" onClick={OrderByThirdScenario}>Third Scenario</button>
                <button className="button" type="button" placeholder="Fourth Scenario" onClick={OrderByFourthScenario}>Fourth Scenario</button>
                <button className="button" type="button" placeholder="Fifth Scenario" onClick={OrderByFifthScenario}>Fifth Scenario</button>
            </div>
            <div className="grid-scenarios-header">
                <div className="grid-item"></div>
                <div className="grid-item">
                    <p className="grid-p">Title</p>
                </div>
                <div className="grid-item">
                    <p className="grid-p">Author</p>
                </div>
                <div className="grid-item">
                    <p className="grid-p">Edition Year</p>
                </div>
            </div>
            {renderScenarios()}
        </div>
    )
}
export default TableScenarios