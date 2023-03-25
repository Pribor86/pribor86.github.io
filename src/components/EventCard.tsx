import React, {useEffect, useState} from "react";
import '../styles/eventCard.scss';
import EventI from "./interfaces/EventI";
import portfolioItemI from "./interfaces/portfolioItemI";
import {EventInfoCard} from "./EventInfoCard";
import {useClickOutside} from '../hooks/useClickOutside'

import logo from '../assets/music_events.png';

interface IEventCardProps {
    event: portfolioItemI;
}

export const EventCard: React.FC<IEventCardProps> = (props) => {

    console.log('EventCard render', props.event)

    const {ref, isComponentVisible, setIsComponentVisible} = useClickOutside(true);
    const [isInfoCardOpen, setIsInfoCardOpen] = useState<boolean>(false);
    const [scrollIntoView, setScrollIntoView] = useState<boolean>(false);

    const openInfoCard = () => {
        setIsInfoCardOpen(!isInfoCardOpen);
        setIsComponentVisible(true)
        setScrollIntoView(true)
    }

    useEffect(() => {
        if (!isComponentVisible) {
            setIsInfoCardOpen(false)
        }
    }, [isComponentVisible]);

    // let filteredImages = props.event.images.filter((image) => {
    //     return image.url.includes('RETINA_LANDSCAPE_16_9') && !image.fallback;
    //
    // })
    // if (filteredImages.length === 0) {
    //     filteredImages = props.event.images.filter((image) => {
    //         return image.url.includes('RETINA_PORTRAIT_16_9') && !image.fallback;
    //     })
    // }
    // if (filteredImages.length === 0) {
    //     filteredImages = props.event.images.filter((image) => {
    //         return !image.fallback && image.width > 300;
    //     })
    // }
    // if (filteredImages.length === 0) {
    //     filteredImages = props.event.images.filter((image) => {
    //         return image.fallback && image.url.includes('RETINA_LANDSCAPE_16_9');
    //     })
    // }

    return (
        <div>
            <div className='event-card'
                 data-testid='event-card'
                 key={props.event.id}
                 id={props.event.id}
                 onClick={() => openInfoCard()}
            >
                <div className={'event-card-image ' + (isInfoCardOpen ? 'open' : null)}>
                    {props.event.images.length > 0 && props.event.images[0] ?
                        <img src={props.event.images[0]} alt="event"/>
                        // <img src={logo} alt="event"/>
                        :
                        <div className='event-card-image-no-image'>
                            {props.event.name} <br/>
                            {props.event.images}
                        </div>
                    }
                </div>
            </div>
            {isInfoCardOpen && (
                <div
                    ref={ref}
                >
                    <EventInfoCard
                        selectedEvent={props.event}
                        openInfoCard={openInfoCard}
                        scrollIntoView={scrollIntoView}
                    />
                </div>
            )
            }
        </div>
    );
}