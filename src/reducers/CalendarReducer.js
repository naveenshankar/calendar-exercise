
const calendarReducer = (state = {
    deleteCache: false,
    slotsMap: {},
    timeSlotsPopulated:false
}, action) => {
    switch (action.type) {
        case "POPULATE_TIMESLOTS_FULFILLED":
            state = {
                ...state,
                slotsMap:action.payload.slotsMap,
                timeSlotsPopulated:action.payload.timeSlotsPopulated
            };
            break;
        default:
        // do nothing
    }
    return state;
};

export default calendarReducer;