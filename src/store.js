import { createStore } from 'redux';
function changeEl(state = {
    city: 'All',
    month: 'All',
    events: []
}, action) {
    if (action.type === 'MONTH_SELECT') {
        return state = {
            city: state.city,
            month: action.changeValue,
            events: state.events
        }
    }
    if (action.type === 'CITY_SELECT') {
        return state = {
            city: action.changeValue,
            month: state.month,
            events: state.events
        }
    }
    if (action.type === 'SET_EVENTS') {
        return Object.assign({}, state, {
            events: action.value
        }) // {...state, events: action.value}
    }
    console.log(action);
    return state;
}

const store = createStore(changeEl);

store.subscribe(() => { //подписка на изменение сторе
    console.log('subscribe', store.getState())
})


export default store;