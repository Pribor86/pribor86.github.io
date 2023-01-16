import React, {useEffect, useState} from 'react';
import './App.css';
import {getEvents, getGenres} from "./http";
import EventI from "./components/interfaces/EventI";
import {Header} from "./components/Header";
import './styles/mainStyles.scss';
import GenreI from "./components/interfaces/GenreI";
import {EventCard} from "./components/EventCard";
import {addEvents, updateEvents, setGenres} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import {EventState, GenreState} from "./type";
import {useAppSelector} from "./store/hooks";
import {AppDispatch} from "./store/store";
// import {RootState} from "./store";

function App() {

    // const [genres, setGenres] = useState<GenreI[]>([]);
    const [page, setPage] = useState<number>(1);
    const [genreId, setGenreId] = useState<string>('');
    const [isEventsEnd, setIsEventsEnd] = useState<boolean>(false);
    // const [isInfoCardOpen, setIsInfoCardOpen] = React.useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = React.useState<EventI | null>(null);
    const [searchValue, setSearchValue] = React.useState('');

    const dispatch = useDispatch<AppDispatch>();
    const events = useAppSelector((state) => state.events.events);
    // const genresState = useAppSelector((state) => state.genres.genres);

    const handleUpdateEvents = (events: EventI[]) => {
        dispatch(updateEvents(events));
    }
    const handleAddEvents = (events: EventI[]) => {
        dispatch(addEvents(events));
    }

    const handleSetGenres = (genres: GenreI[]) => {
        dispatch(setGenres(genres));
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
            if (!isEventsEnd) {
                let newPage = page + 1;
                setPage(newPage);
                getEvents(page, genreId, searchValue).then((events) => {
                    if (events.length === 0) {
                        setIsEventsEnd(true);
                    }
                    handleAddEvents(events);
                });
            }
        }
    }

    useEffect(() => {
        getGenres().then((genres) => {
            handleSetGenres(genres);
        });
    }, []);

    useEffect(() => {
        getEvents(page, genreId, searchValue).then((events) => {
            // setEvents(events);
            handleUpdateEvents(events);
            setIsEventsEnd(false);
            setPage(1);
            window.scrollTo(0, 0);
        });
    },[genreId, searchValue] );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });


    return (
        <div className="App">
            <Header
                page={page}
                setGenreId={setGenreId}
                setSearchValue={setSearchValue}
            />
            {events.length > 0 ? (
                <div className='events-wrapper'>
                    {events.map((event: EventI, index: number) => {
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
