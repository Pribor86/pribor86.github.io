import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {getEvents, getGenres} from "./http";
import EventI from "./components/interfaces/EventI";
import {Header} from "./components/Header";
import './styles/mainStyles.scss';
import GenreI from "./components/interfaces/GenreI";

//create mock data for GenreI[]
// const genres: GenreI[] = [
//     {
//         id: "1",
//         name: 'Rock'
//     },
//     {
//         id: "2",
//         name: 'Pop'
//     },
//     {
//         id: "3",
//         name: 'Jazz'
//     },
//     {
//         id: "4",
//         name: 'Blues'
//     },
//     {
//         id: "5",
//         name: 'Folk'
//     },
//     {
//         id: "6",
//         name: 'Country'
//     },
//     {
//         id: "7",
//         name: 'Electronic'
//     },
//     {
//         id: "8",
//         name: 'Classical'
//     },
//     {
//         id: "9",
//         name: 'Reggae'
//     },
//     {
//         id: "10",
//         name: 'Metal'
//     },
//     ];
//

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
            />
            <div className='events-wrapper'>
                <div className="event-cards">
                    {events.length > 0 ? events.map((event) => {
                        return (
                            <div key={event.id}>
                                <h1>YOYOYO</h1>
                                <h1>{event.name}</h1>
                                <p>{Object.keys(event.dates).map((key) => {
                                    return (
                                        <div key={key}>
                                            <p>{key}</p>
                                        </div>
                                    );
                                })}</p>
                                <p>{event.locale}</p>
                            </div>
                        );
                    }) : <p>No events</p>}
                </div>
            </div>
        </div>
    );
}

export default App;
