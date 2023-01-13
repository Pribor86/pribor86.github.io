import React from "react";
import EventI from "./interfaces/EventI";
import '../styles/eventInfoCard.scss'

interface EventInfoCardProps {
    selectedEvent: EventI | null;
}

export const EventInfoCard: React.FC<EventInfoCardProps> = (props) => {
    return (
        <div className="event-info-bg">
            <div className="event-info-card">
                {props.selectedEvent ? (
                    <div className="event-info-card-wrapper">
                        <h2>{props.selectedEvent.name}</h2>
                        <p>{props.selectedEvent.dates.start.localDate} @ {props.selectedEvent.dates.start.localTime}</p>
                        {props.selectedEvent._embedded.venues.length > 0 ? (
                            <p>{props.selectedEvent._embedded.venues[0].name}, {props.selectedEvent._embedded.venues[0].city.name}, {props.selectedEvent._embedded.venues[0].country.name}</p>
                        ) : (
                            <p>Location not available</p>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}