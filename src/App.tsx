import React, {useEffect, useState} from 'react';
import './App.css';
import {getEvents, getGenres} from "./http";
import EventI from "./components/interfaces/EventI";
import {Header} from "./components/Header";
import './styles/mainStyles.scss';
import GenreI from "./components/interfaces/GenreI";
import {EventCard} from "./components/EventCard";


function App() {
    const [events, setEvents] = useState<EventI[]>([]);
    const [genres, setGenres] = useState<GenreI[]>([]);
    const [page, setPage] = useState<number>(1);
    const [genreId, setGenreId] = useState<string>('');
    const [isEventsEnd, setIsEventsEnd] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = React.useState<EventI | null>(null);
    const [searchValue, setSearchValue] = React.useState('');

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 5 >= document.documentElement.offsetHeight) {
            if (!isEventsEnd) {
                let newPage = page + 1;
                setPage(newPage);
                getEvents(page, genreId, searchValue).then((events) => {
                    if (events.length === 0) {
                        setIsEventsEnd(true);
                    }
                    setEvents((oldEvents) => [...oldEvents, ...events]);
                });
            }
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        getGenres().then((genres) => {
            setGenres(genres);
        });
    }, []);
    useEffect(() => {
        getEvents(page, genreId, searchValue).then((events) => {
            setEvents(events);
            setIsEventsEnd(false);
            setPage(1);
            window.scrollTo(0, 0);
        });
    },[genreId, searchValue] );

    return (
        <div className="App">
            <Header
                genres={genres}
                setEvents={setEvents}
                page={page}
                setGenreId={setGenreId}
                setSearchValue={setSearchValue}
            />
            {events.length > 0 ? (
                <div className='events-wrapper'>
                    {events.map((event, index) => {
                        return (
                            <EventCard
                                event={event}
                                key={index}
                                setSelectedEvent={setSelectedEvent}
                            />
                        );
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


        </div>
    );
}
export default App;
