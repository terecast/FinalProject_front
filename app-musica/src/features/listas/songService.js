import axios from 'axios'

const API_URL = 'http://localhost:5000/api/songs/'

const getSongs = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get (API_URL, config)
    return response.data
}

const getAlbumArt = async (token,artist) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get (API_URL+"/album?artist="+artist, config)
    return response.data
}

//Agregar una Cancion
/*const crearLista = async (songData, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post (API_URL, songData, config)
    return response.data
}

//Obtener lista de canciones
const getLista = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`

        }
    }
    const response = await axios.get (API_URL, config)
    return response.data
}*/
const songService = {
    getSongs,
    getAlbumArt
}



export default songService