export const setUsername = name => dispatch => {
    console.log('actions setUsername', name)
    dispatch({
        type: 'SET_USER_NAME',
        payload: name
    })
}

export const setAuthToken = token => dispatch => {
    console.log('actions setAuthToken', token)
    dispatch({
        type: 'SET_AUTH_TOKEN',
        payload: token
    })
}

export const moveContent = () => dispatch => {
    dispatch({
        type: 'MOVE_CONTENT'
    });
}

