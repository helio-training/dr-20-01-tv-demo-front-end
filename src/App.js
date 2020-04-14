import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  state = {
    userInput: {
      name: '',
      rating: 0,
      imageUrl: ''
    }
  }

  save = async () => {
    const tvShow = this.state.userInput

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tv-shows`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tvShow)
    })

    if (response.status === 201) {
      this.setState({
        userInput: {
          name: '',
          rating: 0,
          imageUrl: ''
        }
      })
    }
    else {
      const result = await response.json()

      console.log('Error in post:', response, result)
    }
  }

  nameChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        name: event.target.value
      }
    })
  }

  ratingChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        rating: event.target.value
      }
    })
  }

  imageUrlChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        imageUrl: event.target.value
      }
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <a href="/">Manage</a>
          <a href="/">Preview</a>
        </nav>
        <div className="crud-area">
          <section>
            <h2>Shows</h2>
            <div>
              <div>
                Show 1 <button>(delete)</button>
              </div>
              <div>
                Show 2 <button>(delete)</button>
              </div>
            </div>
          </section>
          <main>
            <h2>New/Edit Show</h2>
            <div>
              <label htmlFor="name-input">Name:</label>
              <input id="name-input" type="text" value={this.state.userInput.name} onChange={this.nameChanged} />
            </div>
            <div>
              <label htmlFor="rating-input">Rating:</label>
              <input id="rating-input" type="text" value={this.state.userInput.rating} onChange={this.ratingChanged} />
            </div>
            <div>
              <label htmlFor="image-url-input">Image URL:</label>
              <input id="image-url-input" type="text" value={this.state.userInput.imageUrl} onChange={this.imageUrlChanged} />
            </div>
            <button onClick={this.save}>Save</button>
          </main>
        </div>
      </div>
    )
  }
}
