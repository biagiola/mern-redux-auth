const initialState = {
    switchNavbar: true,
    logout: false
}
console.log('reducer')
export default function(state = initialState, action) {
    switch(action.type){
        case 'SWITCH_NAVBAR':
            console.log('SWITCH_NAVBAR')
            return {
                ...state,
                switchNavbar: !state.switchNavbar
            }
        case 'LOGOUT':
            
        default:
            return state;
    }
}