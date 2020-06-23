const initialState = {
    switchNavbar: false
}

console.log('hola');

export default function(state = initialState, action) {
    switch(action.type){
        case 'SWITCH_NAVBAR':
            return {
                ...state,
                switchNavbar: true
            }
        default:
            return state;
    }
}