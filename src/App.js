import React, { Component, Fragment } from 'react'
import './App.css'

export default class App extends Component {
  state = {
    tvShows: [],
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
        'content-type': 'application/json'
      },
      body: JSON.stringify(tvShow)
    })

    const successful = response.status === 201

    if (successful) {
      this.setState({
        userInput: {
          name: '',
          rating: 0,
          imageUrl: ''
        },
        error: null
      })
    }
    else {
      const error = await response.json()

      this.setState({ error })

      console.log(error)
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

  renderError = () => {
    return this.state.error
      ? (<div>{this.state.error.message}</div>)
      : (<Fragment />)
  }

  renderTVShows = () => {
    return this.state.tvShows.map((tvShow) => {
      return (<div key={tvShow.name}>{tvShow.name} <button>(delete)</button></div>)
    })
  }

  getTVShows = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tv-shows`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'accept': 'application/json'
      }
    })

    const successful = response.status === 200

    if (successful) {
      const tvShows = await response.json()

      this.setState({ tvShows })
    }
    else {
      console.log(response)
    }
  }

  componentDidMount() {
    this.getTVShows()
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
              {this.renderTVShows()}
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
            {this.renderError()}
            <button onClick={this.save}>Save</button>
          </main>
        </div>
      </div>
    )
  }
}
