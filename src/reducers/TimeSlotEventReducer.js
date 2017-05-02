
const timeSlotEventReducer = (state = {
    selectedTimeSlot:{},
    overlayReadyToLaunch:false
}, action) => {
    switch (action.type) {
        case "LAUNCH_OVERLAY_FULFILLED":
            state = {
                ...state,
                overlayReadyToLaunch:action.payload.overlayReadyToLaunch,
                selectedTimeSlot:action.payload.selectedTimeSlot
            };
            break;
        case "CLOSE_OVERLAY_FULFILLED":
            state = {
                ...state,
                overlayReadyToLaunch:action.payload.overlayReadyToLaunch,
                selectedTimeSlot:action.payload.selectedTimeSlot
            };
            break;
        default:
        // do nothing
    }
    return state;
};

export default timeSlotEventReducer;