export function changeCity(value) {
    return {
        type: 'CITY_SELECT',
        changeValue: value
    }
}
export function changeMonth(value) {
    return {
        type: 'MONTH_SELECT',
        changeValue: value
    }
}
export function getEvents(value) {
    return {
        type: 'GET_EVENTS',
        events: value
    }
}
export function setEvents(value) {
    return {
        type: 'SET_EVENTS',
        value: value
    }
}
