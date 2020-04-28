import React, { Component, Fragment } from 'react'
import TVShowsList from '../TVShowsList'
import { getTVShows, deleteTVShow } from '../TVShowsApi'

export default class extends Component {
    state = {
        tvShows: [],
        tvShow: {}
    }

    loadData = async () => {
        const result = await getTVShows()

        if (result.successful) {
            this.setState({ tvShows: result.tvShows })
        }
    }

    selectItem = (event) => {
        const tvShowId = event.target.attributes.getNamedItem('tvshowid').value
        const tvShow = this.state.tvShows.reduce((tvShowToEdit, tvShow) => {
            return tvShow._id === tvShowId ? tvShow : tvShowToEdit
        }, null)
        if (tvShow) {
            this.setState({
                tvShow
            })
        }
    }

    delete = async (event) => {
        const tvShowId = event.target.attributes.getNamedItem('tvshowid').value

        const successful = await deleteTVShow(tvShowId)

        if (successful) {
            await this.loadData()
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <div>
                <TVShowsList tvShows={this.state.tvShows} selectItem={this.selectItem} delete={this.delete} />
                <main>
                    {
                        !this.state.tvShow
                            ? (<div>Nothing Selected</div>)
                            : (
                                <Fragment>
                                    <header>
                                        <h1>{this.state.tvShow.name}</h1>
                                        <h2>Rating: {this.state.tvShow.rating}</h2>
                                    </header>
                                    <img src={this.state.tvShow.imageUrl} />
                                </Fragment>
                            )
                    }
                </main>
            </div>
        )
    }
}