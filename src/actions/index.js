export const changeShowNavbar = () => dispatch => {
    console.log('actions')
    dispatch({
        type: 'SWITCH_NAVBAR'
    });
}
