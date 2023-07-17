import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        try {
            var response = await axios.get('http://localhost:3001/dogs')
            return dispatch({
            type: 'GET_DOGS',
            payload: response.data
        })
        } catch (error) {
            alert(error.response.data.error)
        }
        
    }
}

export function getTemps(){
    return async function(dispatch){
        try {
            var response = await axios.get('http://localhost:3001/temperaments')
            return dispatch({
            type: 'GET_TEMPS',
            payload: response.data
        })
        } catch (error) {
            alert(error.response.data.error)
        }
    
    }
}

export const dogsByAlphabetOrder = (payload) => {
    return{
        type: 'ORDER_BY_ALPHABET',
        payload
    }
}

export const dogsByOrigin = (payload) => {
    return{
        type: 'ORDER_BY_ORIGIN',
        payload
    }
}

export const dogsByTemp = (payload) => {
    return{
        type: 'ORDER_BY_TEMP',
        payload
    }
}