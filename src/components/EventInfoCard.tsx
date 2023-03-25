import React, {useEffect, useRef, useState} from "react";
import EventI from "./interfaces/EventI";
import portfolioItemI from "./interfaces/portfolioItemI";
import EventDescI from "./interfaces/EventDescI";
import '../styles/eventInfoCard.scss'
import calendarLogo from '../assets/calendar.png';
import locationLogo from '../assets/place.png';
import descArray from "../mock/eventDesc.json";
import {BackButton} from "./BackButton";
import moment from "moment";

interface EventInfoCardProps {
    openInfoCard: () => void;
    selectedEvent: portfolioItemI | null;
    scrollIntoView: boolean;
}

export const EventInfoCard: React.FC<EventInfoCardProps> = (props) => {

    const [eventDesc, setEventDesc] = useState<EventDescI>(descArray[0]);
    const ref = useRef<HTMLDivElement>(null);

    const getDayFromDate = (date: string) => {
        return moment(date).format('dddd');
    }

    const getRandomDesc = () => {
        const randomIndex = Math.floor(Math.random() * descArray.length);
        setEventDesc(descArray[randomIndex]);
    }

    const isInViewport = (element: any) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 250 &&
            rect.bottom <= (window.innerHeight - 20 || document.documentElement.clientHeight - 20)
        );
    }

    const scrollInfoViewIfNotFullyVisible = (element: any) => {
        if (element && !isInViewport(element)) {
            ref.current?.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }

    useEffect(() => {
        getRandomDesc();
    }, [props.selectedEvent]);

    useEffect(
        () => {
            let timer1 = setTimeout(() => scrollInfoViewIfNotFullyVisible(ref.current), 600);
            return () => {
                clearTimeout(timer1);

            };
        });

    return (
        <div ref={ref} className={'event-info-bg'}>
            <div
                className="event-info-card"
                data-testid="event-info-card"
            >
                {props.selectedEvent ? (
                    <div className="event-info-card-wrapper">
                        <div className='event-info-card-description'>
                            <h2>{props.selectedEvent.name}</h2>
                            <div className='event-info-card-date'>
                                <img src={calendarLogo} alt="date"/>
                                <p>
                                    {getDayFromDate(props.selectedEvent.tech[0])}
                                    , {props.selectedEvent.tech[1]} @ {props.selectedEvent.tech[2]}
                                </p>
                            </div>
                            <div className='event-info-card-place'>
                                <img src={locationLogo} alt="location"/>
                                {props.selectedEvent.tech.length > 0 ? (
                                    <p>
                                        {props.selectedEvent.tech[1]}
                                        , {props.selectedEvent.tech[2]}
                                        , {props.selectedEvent.tech[3]}
                                    </p>

                                ) : (
                                    <p>Location not available</p>
                                )}
                            </div>
                            <div className='event-info-card-context'>
                                <p>{eventDesc.desc}</p>
                            </div>
                            <div className='event-info-card-button'>
                                <BackButton openInfoCard={props.openInfoCard}/>
                            </div>
                        </div>
                        <div className='event-info-card-image'>
                            {props.selectedEvent.images.length > 0 ? (
                                <img src={props.selectedEvent.images[0]} alt="event"/>
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