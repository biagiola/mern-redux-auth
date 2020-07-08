const initialState = {
    switchNavbar: true,
    logout: false,
    gone: false,
}

export default function(state = initialState, action) {
    switch(action.type){
        case 'SWITCH_NAVBAR':
            console.log('SWITCH_NAVBAR')
            return {
                ...state,
                switchNavbar: !state.switchNavbar
            }
        case 'ARTICLES_GONE':
            return {
                ...state,
                gone: !state.gone
            }            
        default:
            return state;
    }
}