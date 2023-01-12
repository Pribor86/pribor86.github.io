import React from "react";
import '../styles/eventCard.scss';
import EventI from "./interfaces/EventI";

interface IEventCardProps {
    event: EventI;
    setSelectedEvent: (event: EventI | null) => void;
}

export const EventCard: React.FC<IEventCardProps> = (props) => {

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
            <div className='event-card'
                 key={props.event.id}
                 id={props.event.id}
            >
                <div className='event-card-image'>
                    {filteredImages.length > 0 && filteredImages[0] ?
                        <img src={filteredImages[0].url} alt="event"/>
                        :
                        <div className='event-card-image-no-image'>
                            {props.event.name}
                        </div>
                    }
                </div>
            </div>
    );
}