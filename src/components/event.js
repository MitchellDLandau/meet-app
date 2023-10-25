import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className="event">
            <div>{event.summary}</div>
            <div>{event.location}</div>
            <div>{event.created}</div>
            {showDetails ? (
                <details open={true} className="details-shown">
                    {event.description}
                </details>
            ) : (
                <details open={false} className="no-details">
                    {event.description}
                </details>
            )}
            <div>
                {showDetails ? (
                    <button
                        onClick={() => {
                            setShowDetails(false);
                        }}
                    >
                        Hide Details
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setShowDetails(true);
                        }}>
                        Show Details
                    </button>
                )};
            </div>
        </li>
    );
};

export default Event;