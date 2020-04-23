import React, { Component, Fragment } from 'react'
import { getTVShows, saveTVShow, deleteTVShow } from '../TVShowsApi'

export default class extends Component {
    state = {
        tvShows: [],
        userInput: {
            name: '',
            rating: 0,
            imageUrl: ''
        }
    }

    loadData = async () => {
        const result = await getTVShows()

        if (result.successful) {
            this.setState({ tvShows: result.tvShows })
        }
    }

    delete = async (event) => {
        const tvShowId = event.target.attributes.getNamedItem('tvshowid').value

        const successful = await deleteTVShow(tvShowId)

        if (successful) {
            await this.loadData()
        }
    }

    save = async () => {
        const tvShow = this.state.userInput

        const result = await saveTVShow(tvShow)

        if (result.successful) {
            await this.loadData()

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
            this.setState({ error: result.error })

            console.log(result.error)
        }
    }

    selectItem = (event) => {
        const tvShowId = event.target.attributes.getNamedItem('tvshowid').value
        const tvShow = this.state.tvShows.reduce((tvShowToEdit, tvShow) => {
            return tvShow._id === tvShowId ? tvShow : tvShowToEdit
        }, null)

        if (tvShow) {
            this.setState({
                userInput: tvShow
            })
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
            return (
                <div key={tvShow._id}>
                    <button tvshowid={tvShow._id} onClick={this.selectItem}>{tvShow.name}</button>
                    <button tvshowid={tvShow._id} onClick={this.delete}>(delete)</button>
                </div>
            )
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <div>
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