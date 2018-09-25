import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './SingleBook'


class AddBook extends Component {

  state = {
    query: '',
    queryResults: []
  }

  updateQuery = (query) => {
    // if (query !== this.state.query) {
       this.setState({ query: query }) 
    // }
    if (query) {
      BooksAPI.search(query)
        .then(response => {
          console.log(response)
          console.log(this.props.booklist)
          if (response.length>0) {
            response.forEach(newbook => {
              let findExisting = this.props.booklist.find(book => book.id === newbook.id)
              if (findExisting) {
                newbook.shelf = findExisting.shelf
              } else {
                newbook.shelf = "none"
              }
            })
            this.setState({
              queryResults: response
            }) 
          } else {
            this.setState({
              queryResults: []
            })  
          }
          
             
        })
        .catch(err => {console.log(err)})
    } else {
      this.setState({
        queryResults: []
      })  
    }

  }

  render() {

    const query = this.state.query

    return (        
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
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
            { 
              this.state.queryResults.map((book, key) =>
                <Book book={book} key={book.id} changeShelf={this.props.changeShelf} />
            )}
        </ol>
      </div>
    </div> 
    )
  }
}

export default AddBook