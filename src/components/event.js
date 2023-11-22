import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className="event">
            <div>{event.summary}</div>
            <div>{event.location}</div>
            <div>{event.created}</div>
            {showDetails ?
                (
                    <div>
                        <p className="details-shown">
                            {event.description}
                        </p>
                        <button
                            className="details-button"
                            onClick={() => {
                                setShowDetails(false);
                            }}
                        >
                            Hide Details
                        </button>
                    </div>
                ) : (
                    <button
                        className="no-details details-button"
                        onClick={() => {
                            setShowDetails(true);
                        }}>
                        Show Details
                    </button>
                )
            }
        </li>
    );
};

export default Event;