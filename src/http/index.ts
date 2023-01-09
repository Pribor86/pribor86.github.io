import axios, {AxiosResponse} from "axios";
import EventI from "../components/interfaces/EventI";
import GenreI from "../components/interfaces/GenreI";

const API_KEY=`0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq`


async function getEvents(): Promise<EventI[]> {
    try {
        const response: AxiosResponse<{ _embedded: { events: EventI[] } }> = await axios.get(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            {
                params: {
                    apikey: API_KEY,
                    countryCode: 'FI',
                    classificationId: 'KZFzniwnSyZfZ7v7nJ',
                },
            },
        );
        console.log("response", response);
        return response.data._embedded.events;
    } catch (error) {
        console.log("error", error);
        return [];
    }
}
async function getGenres(): Promise<GenreI[]> {
    try {
        const response: AxiosResponse<{ segment: {_embedded: {genres: GenreI[] } } }> = await axios.get(
            'https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ',
            {
                params: {
                    apikey: API_KEY,
                },
            },
        );
        console.log("response genres", response);
        return response.data.segment._embedded.genres;
    }
    catch (error) {
        console.log("error", error);
        return [];
    }
}

export {getEvents, getGenres};