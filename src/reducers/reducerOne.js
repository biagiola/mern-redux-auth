const initialState = {
    switchNavbar: false,
    logout: false,
    gone: false,
    username: 'asdf'
}

export default function(state = initialState, action) {
    switch(action.type){
        case 'SWITCH_NAVBAR':
            console.log('SWITCH_NAVBAR')
            return {
                ...state,
                switchNavbar: !state.switchNavbar
            }
        case 'SET_USER_NAME':
            console.log('SET_USER_NAME')
            return {
                ...state,
                username: action.payload
            }
        case 'ARTICLES_GONE':
            return {
                ...state,
                gone: true
            }            
        default:
            return state;
    }
}