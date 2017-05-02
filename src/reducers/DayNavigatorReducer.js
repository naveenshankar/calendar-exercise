import DATA_SET from '../utils/data';

const DayNavigatorReducer = (state = {
    events: DATA_SET,
    day: Date.now(),
    eventsFilteredbyDay: {}
}, action) => {
    switch (action.type) {
        case "FILTER_EVENTS_BY_DAY_FULFILLED":
            state = {
                ...state,
                events:action.payload.events,
                day:action.payload.day,
                eventsFilteredbyDay:action.payload.eventsFilteredbyDay
            };
            break;
        default:
        // do nothing
    }
    return state;
};

export default DayNavigatorReducer;