
export function launchOverlay(data) {
    return {
        type: "LAUNCH_OVERLAY",
		payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({"selectedTimeSlot":data,"overlayReadyToLaunch":true});
            }, 0);
        })
    };
}

export function closeOverlay() {
    return {
        type: "CLOSE_OVERLAY",
		payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({"overlayReadyToLaunch": false});
            }, 20);
        })
    };
}
