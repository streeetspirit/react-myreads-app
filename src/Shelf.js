import React, { Component } from 'react'
import Book from './SingleBook'

class Shelf extends Component {
  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelvedbooks.map((book, key) =>
              <Book book={book} key={key} changeShelf={this.props.changeShelf} />
            )}
            
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf