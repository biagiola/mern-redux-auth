export const changeShowNavbar = () => dispatch => {
    console.log('actions')
    dispatch({
        type: 'SWITCH_NAVBAR',
    });
}

export const setUsername = name => dispatch => {
    console.log('actions setUsername', name)
    dispatch({
        type: 'SET_USER_NAME',
        payload: name
    })
}

export const articlesGone = () => dispatch => {
    console.log('actions articlesGone')
    dispatch({
        type: 'ARTICLES_GONE'
    });
}
