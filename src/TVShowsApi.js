export const getTVShows = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tv-shows`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'accept': 'application/json'
        }
    })

    const successful = response.status === 200

    return {
        successful,
        tvShows: successful ? await response.json() : []
    }
}

export const saveTVShow = async (tvShow) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tv-shows`, {
        method: tvShow._id ? 'PUT' : 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(tvShow)
    })

    const successful = response.status === 201 || response.status === 200

    return {
        successful,
        error: successful ? null : await response.json()
    }
}

export const deleteTVShow = async (tvShowId) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tv-shows/${tvShowId}`, {
        method: 'DELETE',
        mode: 'cors'
    })

    const successful = response.status === 200

    return successful
}