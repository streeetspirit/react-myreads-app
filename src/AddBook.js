import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './SingleBook'


class AddBook extends Component {

  state = {
    query: '',
    queryResults: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() }) 

  }

  render() {

    const query = this.state.query
 
    if (query) {
      BooksAPI.search(query)
        .then(response => {
          console.log(response)
          console.log(this.props.booklist)
          response.forEach(newbook => {
            let findExisting = this.props.booklist.filter(book => book.id === newbook.id)
            if (findExisting) {
              newbook.shelf = findExisting.shelf
            } else {
              newbook.shelf = "none"
            }
          })
          this.setState({queryResults: response})
          
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
      <div className="search-books-results">
        <ol className="books-grid">
            {this.state.queryResults.map((book) => 
              <Book book={book} key={book.id} changeShelf={this.props.changeShelf} />
            )}
        </ol>
      </div>
    </div> 
    )
  }
}

export default AddBook