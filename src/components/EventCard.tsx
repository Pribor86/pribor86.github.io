import React, {useEffect, useState} from "react";
import '../styles/eventCard.scss';
import EventI from "./interfaces/EventI";
import {EventInfoCard} from "./EventInfoCard";
import { useClickOutside } from '../hooks/useClickOutside'

interface IEventCardProps {
    event: EventI;
    setSelectedEvent: (event: EventI | null) => void;
}

export const EventCard: React.FC<IEventCardProps> = (props) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(true);
    const [isInfoCardOpen, setIsInfoCardOpen] = useState<boolean>(false);

    console.log(isInfoCardOpen);
    const openInfoCard = () => {
        // props.setSelectedEvent(props.event);
        setIsInfoCardOpen(!isInfoCardOpen);
        setIsComponentVisible(true)
    }

    useEffect(() => {
        if (!isComponentVisible) {
            setIsInfoCardOpen(false)
        }
    },[isComponentVisible] );

    let filteredImages = props.event.images.filter((image) => {
        return image.url.includes('RETINA_LANDSCAPE_16_9') && !image.fallback;

    })
    if (filteredImages.length === 0) {
        filteredImages = props.event.images.filter((image) => {
            return image.url.includes('RETINA_PORTRAIT_16_9') && !image.fallback;
        })
    }
    if (filteredImages.length === 0) {
        filteredImages = props.event.images.filter((image) => {
            return !image.fallback && image.width > 300;
        })
    }
    if (filteredImages.length === 0) {
        filteredImages = props.event.images.filter((image) => {
            return image.fallback && image.url.includes('RETINA_LANDSCAPE_16_9');
        })
    }

    return (
        <div >
            <div className='event-card'
                 key={props.event.id}
                 id={props.event.id}
                 onClick={() => openInfoCard()}
            >
                <div className={'event-card-image ' + (isInfoCardOpen ? 'open' : null)}>
                    {filteredImages.length > 0 && filteredImages[0] ?
                        <img src={filteredImages[0].url} alt="event"/>
                        :
                        <div className='event-card-image-no-image'>
                            {props.event.name}
                        </div>
                    }
                </div>
            </div>
            {isInfoCardOpen && (
                <div ref={ref}>
                    <EventInfoCard
                        selectedEvent={props.event}
                        openInfoCard={openInfoCard}
                    />
                </div>
            )
            }
        </div>
    );
}