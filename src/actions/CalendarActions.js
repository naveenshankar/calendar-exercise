
export function populateTimeSlots(slotsMap) {
    return {
        type: "POPULATE_TIMESLOTS",
		payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({"timeSlotsPopulated": true,"slotsMap":slotsMap});
            }, 20);
        })
    };
}