import React, {useEffect, useState} from 'react';
import {getGenres} from "./http";
//components
import {Header} from "./components/Header";
import {EventList} from "./views/EventList";
import {Footer} from "./components/footer";

//redux store
import {setGenres} from "./store/actions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store";
//interfaces
import GenreI from "./components/interfaces/GenreI";
//styles
import './App.css';
import './styles/mainStyles.scss';

function App() {

    const [genreId, setGenreId] = useState<string>('');
    const [searchValue, setSearchValue] = React.useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSetGenres = (genres: GenreI[]) => {
        dispatch(setGenres(genres));
    }

    useEffect(() => {
        getGenres().then((genres) => {
            handleSetGenres(genres);
        });
    });

    // noinspection SpellCheckingInspection
    return (
        <div className="App">
            <Header
                setGenreId={setGenreId}
                setSearchValue={setSearchValue}
            />
            <EventList
                genreId={genreId}
                searchValue={searchValue}
            />
            <Footer title={'Fitek 2020'}/>
        </div>
    );
}

export default App;
