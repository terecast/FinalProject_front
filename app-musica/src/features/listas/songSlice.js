import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import songService from './songService'


//crear una nueva lista
export const getSongs = createAsyncThunk('songs/getSongs', async(_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await songService.getSongs(token)
    } catch (error) {
        const message = (error.reponse && error.reponse.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const filterSongs = createAsyncThunk('songs/filterSongs',async(data,thunkAPI) => {
    if(data.filter != ''){
        const filteredSongs  = data.data.filter((song) => 
            song.song.toLowerCase().includes(data.filter.toLowerCase()));

       return filteredSongs
    }else
        return data.data
})

const initialState = {
    songs: [],
    songFilter: [],
    filter : '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}



export const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
    },
}, 
    extraReducers: (builder) => {
        builder
            .addCase(getSongs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSongs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.songs = action.payload

                if(state.filter != ''){
                    const filteredSongs  = action.payload.filter((song) => 
                        song.song.toLowerCase().includes(state.filter));
     
                    state.songFilter = filteredSongs
                }else
                    state.songFilter = state.songs
                
            })
            .addCase(getSongs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(filterSongs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.songFilter = action.payload
                
            })
    }
})

export const { reset } = songSlice.actions
export default songSlice.reducer
