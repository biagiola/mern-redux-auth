export const changeShowNavbar = data => dispatch => {
    dispatch({
        type: 'SHOW_HIDE_NAVBAR',
        payload: data
    });
}
