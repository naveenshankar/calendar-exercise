import {PropTypes} from 'prop-types'; // ES6 

export const EVENT_PROP_TYPE = PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    color: PropTypes.oneOf(['sky', 'rose', 'canary', 'shamrock']).isRequired
});
export const EVENTS_PROP_TYPE = PropTypes.arrayOf(EVENT_PROP_TYPE);
