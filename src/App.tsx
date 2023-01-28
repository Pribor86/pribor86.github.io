import React, {useEffect, useState} from 'react';
import {getEvents, getGenres} from "./http";
//components
import {Header} from "./components/Header";
import {EventCard} from "./components/EventCard";
import {Footer} from "./components/footer";

//redux store
import {useAppSelector} from "./store/hooks";
import {addEvents, updateEvents, setGenres} from "./store/actions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store";
//interfaces
import EventI from "./components/interfaces/EventI";
import GenreI from "./components/interfaces/GenreI";
//styles
import './App.css';
import './styles/mainStyles.scss';

function App() {

    const [page, setPage] = useState<number>(1);
    const [genreId, setGenreId] = useState<string>('');
    const [isEventsEnd, setIsEventsEnd] = useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState('');

    const dispatch = useDispatch<AppDispatch>();
    const events = useAppSelector((state) => state.events.events);

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
        if (
            window.innerHeight
            + document.documentElement.scrollTop
            + 1
            >= document.documentElement.offsetHeight
        ) {
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
            handleUpdateEvents(events);
            setIsEventsEnd(false);
            setPage(1);
            window.scrollTo(0, 0);
        });
    }, [genreId, searchValue]);

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
            <Footer/>
        </div>
    );
}

export default App;
