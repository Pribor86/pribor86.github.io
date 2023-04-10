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
                                {/*<img src={calendarLogo} alt="date"/>*/}
                                <b>Technologies:</b>
                                {props.selectedEvent.tech.length > 0 ? (
                                    props.selectedEvent.tech.map((item, index) => {

                                        return (
                                            <span key={index} style={{whiteSpace: 'nowrap'}}>
                                                         {item}
                                                    </span>
                                        )
                                    })
                                ) : (
                                    <p>Date not available</p>
                                )}


                            </div>
                            <div className='event-info-card-place'>
                                <b>Links:</b>
                                {props.selectedEvent.links.length > 0 ? (
                                    props.selectedEvent.links.map((item: any, index) => {
                                        if (item.url.length > 0) {
                                            return (
                                                <span key={index} style={{whiteSpace: 'nowrap'}}>
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                        {item.name}
                                                    </a>
                                                </span>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })
                                ) : (
                                    <p>Links are not available!</p>
                                )}
                            </div>
                            <div className='event-info-card-context'>
                                <p>{props.selectedEvent.description}</p>
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