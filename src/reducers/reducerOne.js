const initialState = {
    username: '',
    authToken: null,
    gone: false,
    moveContentValue: false,
    userImage: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SET_AUTH_TOKEN':
        console.log('SET_AUTH_TOKEN')
            return {
                ...state,
                authToken: action.payload
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

        case 'MOVE_CONTENT':
            return {
                ...state,
                moveContentValue: !state.moveContentValue
            }

        case 'USER_IMAGE':
            return {
                ...state,
                userImage: action.payload
            }
        default:
        return state;
    }
}