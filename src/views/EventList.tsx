import React, {useCallback, useEffect, useState} from 'react';
import {getEvents, getPortfolio} from "../http";
import {EventCard} from "../components/EventCard";
import {useAppSelector} from "../store/hooks";
import {addEvents, updateEvents} from "../store/actions";
import EventI from "../components/interfaces/EventI";
import portfolioItemI from "../components/interfaces/portfolioItemI";
import {AppDispatch} from "../store/store";
import {useDispatch} from "react-redux";

interface Props {
    genreId: string;
    searchValue: string;
}

export const EventList: React.FC<Props> = ({genreId, searchValue}) => {

    const [isEventsEnd, setIsEventsEnd] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [internalPage] = useState<number>(page);

    const dispatch = useDispatch<AppDispatch>();
    const events = useAppSelector((state) => state.events.events);

    const handleUpdateEvents = (events: portfolioItemI[]) => {
        dispatch(updateEvents(events));
    };
    const memoizedHandleUpdateEvents = useCallback(handleUpdateEvents, [dispatch]);
    const handleAddEvents = (events: portfolioItemI[]) => {
        dispatch(addEvents(events));
    }
    const handleScroll = () => {
        if (
            window.innerHeight
            + document.documentElement.scrollTop
            + 1
            >= document.documentElement.offsetHeight
        ) {
            if (!isEventsEnd) {
                let newPage = page + 1;
                setPage(newPage);
                // getEvents(page, genreId, searchValue).then((events) => {
                //     if (events.length === 0) {
                //         setIsEventsEnd(true);
                //     }
                //     handleAddEvents(events);
                // });
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        // getEvents(internalPage, genreId, searchValue).then((events) => {
        //     memoizedHandleUpdateEvents(events);
        //     setIsEventsEnd(false);
        //     setPage(1);
        //     window.scrollTo(0, 0);
        // });
        getPortfolio().then((portfolio) => {
            console.log(portfolio);
            memoizedHandleUpdateEvents(portfolio);
        });
    }, [genreId, searchValue, memoizedHandleUpdateEvents, internalPage]);

    return (
        <>
            {events.length > 0 ? (
                <div className='events-wrapper'>
                    {events.map((event: portfolioItemI, index: number) => {
                        return (
                            <EventCard
                                event={event}
                                key={index}
                            />
                        )
                    })
                    }
                </div>
            ) : (
                <div className='no-events-wrapper'>
                    <div className="no-events">
                        <p>Sorry, we didn't find any events for the genre.</p>
                    </div>
                </div>
            )}
        </>
    );
};