import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import AddBook from './AddBook'
import Shelf from './Shelf'


class App extends React.Component {

  state = {
    booklist: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(response => {
        this.setState({booklist: response})
      })
    .catch(err => {console.log(err)})
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(response => {

        // if the book was not in our shelf - add it
        if (book.shelf === "none") {
          book.shelf = shelf
          this.setState({
            booklist: this.state.booklist.concat([book])
          })
        
        } else

          // if the book gets 'none' status - remove it from our list
          if (shelf === "none") {
            book.shelf = shelf
            this.setState({booklist: this.state.booklist.filter(item => item.shelf !== "none")
            })
          } else {
            book.shelf = shelf;
          }
      })
  }

  render() {
    return (
      <div className="app">
        
        {/* open new page for searching and adding books */}
        <Route path="/addbook" render={() => (
          <AddBook
            changeShelf={this.changeShelf}
            booklist={this.state.booklist}
          />
        )}
        />
        
        {/* rendering main page with shelves */}

        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
                <Shelf
                  category="Currently Reading"
                  changeShelf={this.changeShelf}
                  shelvedbooks={this.state.booklist.filter(book => book.shelf === "currentlyReading")} />
                <Shelf
                  category="Want To Read"
                  changeShelf={this.changeShelf}
                  shelvedbooks={this.state.booklist.filter(book => book.shelf === "wantToRead")}
                />
                <Shelf
                  category="Finished"
                  changeShelf={this.changeShelf}
                  shelvedbooks={this.state.booklist.filter(book => book.shelf === "read")}/>
            </div>
          </div>
          <div className="open-search">
            <Link to='/addbook'>Add a book</Link>
          </div>
        </div>
        )}
        />
          
      </div>
    )
  }
}

export default App
