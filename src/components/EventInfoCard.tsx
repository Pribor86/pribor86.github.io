import React, {useEffect, useState} from "react";
import EventI from "./interfaces/EventI";
import EventDescI from "./interfaces/EventDescI";
import '../styles/eventInfoCard.scss'
import calendarLogo from '../assets/calendar.png';
import locationLogo from '../assets/place.png';
import descArray from "../mock/eventDesc.json";

interface EventInfoCardProps {
    selectedEvent: EventI | null;
}

export const EventInfoCard: React.FC<EventInfoCardProps> = (props) => {

    const [eventDesc, setEventDesc] = useState<EventDescI>(descArray[0]);

    //randomly select event description from descArray
    const getRandomDesc = () => {
        const randomIndex = Math.floor(Math.random() * descArray.length);
        setEventDesc(descArray[randomIndex]);
    }

    useEffect(() => {
        getRandomDesc();
    }, [props.selectedEvent]);

    return (
        <div className="event-info-bg">
            <div className="event-info-card">
                {props.selectedEvent ? (
                    <div className="event-info-card-wrapper">
                        <div className='event-info-card-description'>
                            <h2>{props.selectedEvent.name}</h2>
                            <div className='event-info-card-date'>
                                <img src={calendarLogo} alt="date"/>
                                <p>{props.selectedEvent.dates.start.localDate} @ {props.selectedEvent.dates.start.localTime}</p>
                            </div>
                            <div className='event-info-card-place'>
                                <img src={locationLogo} alt="location"/>
                                {props.selectedEvent._embedded.venues.length > 0 ? (
                                    <p>{props.selectedEvent._embedded.venues[0].name}, {props.selectedEvent._embedded.venues[0].city.name}, {props.selectedEvent._embedded.venues[0].country.name}</p>

                                ) : (
                                    <p>Location not available</p>
                                )}
                            </div>
                            <div className='event-info-card-context'>
                                <p>{eventDesc.desc}</p>
                            </div>
                        </div>
                        <div className='event-info-card-image'>
                            {props.selectedEvent.images.length > 0 ? (
                                <img src={props.selectedEvent.images[0].url} alt="event"/>
                            ) : (
                                <div className='event-info-card-image-no-image'>
                                    <p>No image available</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}