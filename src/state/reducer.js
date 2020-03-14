export const initialState = {
    viewList: 'User',
    postList: [],
    albumList: [],
    userId: 0,
    name: ''
};

export function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_VIEW_LIST':
        return {
            ...state,
            viewList: action.data
        };
        case 'SET_POST_LIST':
        Object.assign(state.postList, action.data);
        return {
            ...state,
            postList: action.data
        };
        case 'SET_ALBUM_LIST':
        Object.assign(state.albumList, action.data);
        return {
            ...state,
            albumList: action.data
        };
        case 'SET_USER_ID':
        return {
            ...state,
            userId: action.data
        };
        case 'SET_USER_NAME':
        return {
            ...state,
            name: action.data
        };
        default: return state;
    }
}