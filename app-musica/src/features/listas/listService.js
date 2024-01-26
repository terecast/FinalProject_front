import axios from 'axios'

const API_URL = 'http://localhost:5000/api/masterlist/'

const postList = async (listName,user) => {
    const config = {
        headers: {
            authorization: `Bearer ${user.token}`
        }
    }
    const body = {
        user : user._id,
        name : listName
    }
    const response = await axios.post (API_URL,body, config)
    return response.data
}

const getList = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get (API_URL, config)
    return response.data
}

const listService = {
    postList,
    getList
}



export default listService