const initialState = {
    switchNavbar: false,
    logout: false
}

console.log('hola');

export default function(state = initialState, action) {
    switch(action.type){
        case 'SWITCH_NAVBAR':
            return {
                ...state,
                switchNavbar: !state.switchNavbar
            }
        case 'LOGOUT':
            return {
                ...state,
                logout: !state.logout
            }
        default:
            return state;
    }
}