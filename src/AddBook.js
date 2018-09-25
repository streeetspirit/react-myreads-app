import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import sortBy from 'sort-by'
// import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import BooksResults from './BooksResults'

class AddBook extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() }) 
    console.log(query)
  }

  // clearQuery = () => {
  //   this.setState ({ query: ''})
  // }

  render() {

    const { query } = this.state
    let searchlist

    if (query) {
      // const match = new RegExp(escapeRegExp(query), 'i')
      BooksAPI.search(query)
        .then(response => {
          searchlist = response
          console.log(response)
        })
        .catch(err => {console.log(err)})
      
      // searchlist.sort(sortBy('title'))
    }

    return (        
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange = { (event) => this.updateQuery(event.target.value)}
            />
        </div>
      </div>
      
      <BooksResults booklist={searchlist} changeShelf={this.props.changeShelf} />  
        
    </div> 
    )
  }
}

export default AddBook