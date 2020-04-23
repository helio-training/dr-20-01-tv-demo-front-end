import React from 'react'

export default (props) => {
    const renderedTVShows = props.tvShows.map((tvShow) => {
        return (
            <div key={tvShow._id}>
                <button tvshowid={tvShow._id} onClick={props.selectItem}>{tvShow.name}</button>
                <button tvshowid={tvShow._id} onClick={props.delete}>(delete)</button>
            </div>
        )
    })

    return (
        <section>
            <h2>Shows</h2>
            <div>
                {renderedTVShows}
            </div>
        </section>
    )
}
