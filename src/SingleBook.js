import React, { Component } from 'react'

class Book extends Component {
  render() {

    return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf || "none"}
                onChange = {(event) => this.changeShelf(this.props.book, event.target.value)}
              >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Finished</option>
              <option value="none">Remove completely</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors[0] || ""}</div>
        </div>
      </li>
    )
  }
}

export default Book