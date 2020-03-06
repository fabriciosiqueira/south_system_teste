const initialState = {
    heroData: {}
};


export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_HERO':
            return {...state, heroData:action.payload.heroData};
        break;
    }

    return state;
}