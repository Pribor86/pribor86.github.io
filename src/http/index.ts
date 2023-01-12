import axios, {AxiosResponse} from "axios";
import EventI from "../components/interfaces/EventI";
import GenreI from "../components/interfaces/GenreI";

const API_KEY=`0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq`


async function getEvents(page: number, genreId: string): Promise<EventI[]> {
    console.log("page", page.toString());
    try {
        const response: AxiosResponse<{ _embedded: { events: EventI[] } }> = await axios.get(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            {
                params: {
                    apikey: API_KEY,
                    //dont foget to change this back to FI
                    countryCode: '',
                    classificationId: 'KZFzniwnSyZfZ7v7nJ',
                    page: page.toString(),
                    genreId: genreId,
                },
            },
        );
        return response.data._embedded.events;
    } catch (error) {
        console.log("error", error);
        return [];
    }
}

// async function getData(endpoint: string): Promise<EventI[]> {
//     try {
//         const response: AxiosResponse<{ _embedded: { events: EventI[] } }> = await axios.get(
//             endpoint,
//             {
//                 params: {
//                     apikey: API_KEY,
//                     countryCode: 'FI',
//                     classificationId: 'KZFzniwnSyZfZ7v7nJ',
//                 },
//             },
//         );
//         return response.data._embedded.events;
//     } catch (error) {
//         console.log("error", error);
//         return [];
//     }
// }
const getData = (endpoint: any): Promise<any> => {
    console.log("endpoint", endpoint);
    return fetch(endpoint)
        .then((response) => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        })
        .catch((err) => {
            throw new Error(
                `There was the following problem: ${err} while fetching ${endpoint}`
            );
        });
};
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
        // console.log("response genres", response);
        return response.data.segment._embedded.genres;
    }
    catch (error) {
        console.log("error", error);
        return [];
    }
}

async function getEventsByGenre(id: string): Promise<EventI[]> {
    try {
        const response: AxiosResponse<{ _embedded: { events: EventI[] } }> = await axios.get(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            {
                params: {
                    apikey: API_KEY,
                    genreId: id,
                    countryCode: 'FI',
                },
            },
        );
        // console.log("response", response);
        return response.data._embedded.events;
    } catch (error) {
        console.log("error", error);
        return [];
    }
}

export {getEvents, getGenres, getEventsByGenre, getData};