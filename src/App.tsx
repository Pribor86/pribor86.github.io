import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {getEvents, getGenres} from "./http";
import EventI from "./components/interfaces/EventI";
import {Header} from "./components/Header";
import './styles/mainStyles.scss';
import GenreI from "./components/interfaces/GenreI";
import {EventCard} from "./components/EventCard";


function App() {
    //set up state for events use EventI[]
    const [events, setEvents] = useState<EventI[]>([]);
    const [genres, setGenres] = useState<GenreI[]>([]);

    //useEffect to call getEvents and set events
    useEffect(() => {
        getEvents().then((events) => {
            setEvents(events);
        });
        getGenres().then((genres) => {
            setGenres(genres);
        });
    }, []);

    console.log(events);

    return (
        <div className="App">
            <Header
                genres={genres}
                setEvents={setEvents}
            />
            <div className='events-wrapper'>
                <div className="event-cards">
                    {events.length > 0 ? events.map((event) => {
                        return (
                            <EventCard event={event} key={event.id}/>
                        );
                        // return (
                        //     <div key={event.id}>
                        //         {/*find genre in classifications array*/}
                        //         {event.classifications.length > 0 ? event.classifications.map((classification) => {
                        //             return (
                        //                 <div key={classification.genre.id}>{classification.genre.name}</div>
                        //
                        //             )}) : null}
                        //         <h1>{event.name}</h1>
                        //         <p>{Object.keys(event.dates).map((key) => {
                        //             return (
                        //                 <div key={key}>
                        //                     <p>{key}</p>
                        //                 </div>
                        //             );
                        //         })}</p>
                        //         <p>{event.locale}</p>
                        //     </div>
                        // );
                    }) : <p>No events</p>}
                </div>
            </div>
        </div>
    );
}

export default App;
