export const changeShowNavbar = () => dispatch => {
    console.log('actions')
    dispatch({
        type: 'SWITCH_NAVBAR'
    });
}

export const articlesGone = () => dispatch => {
    console.log('actions articlesGone')
    dispatch({
        type: 'ARTICLES_GONE'
    });
}
