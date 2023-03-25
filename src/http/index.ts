import axios, {AxiosResponse} from "axios";
import EventI from "../components/interfaces/EventI";
import GenreI from "../components/interfaces/GenreI";

import portfolioJson from "../mock/portfolioObjects.json";

import PortfolioItemI from "../components/interfaces/portfolioItemI";

const API_KEY = `0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq`

//read portfolio data from json file

function getPortfolio(): Promise<PortfolioItemI[]> {
    return new Promise((resolve, reject) => {
        resolve(portfolioJson);
    });
}

// async function getPortfolio(): Promise<PortfolioItemI[]> {
//     try {
//         const response: AxiosResponse<PortfolioItemI[]> = await axios.get(
//             'https://github.com/Pribor86/ReactTypescriptApp/blob/a66a0f96e67ccab10244fffe81d9e3280af94c23/src/mock/porfolioObjects.json',
//         );
//         return response.data;
//     } catch (error) {
//         console.log("error", error);
//         return [];
//     }
// }


async function getEvents(page: number, genreId: string, searchValue: string): Promise<EventI[]> {
    try {
        // noinspection SpellCheckingInspection
        const response: AxiosResponse<{ _embedded?: { events?: EventI[] } }> = await axios.get(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            {
                params: {
                    apikey: API_KEY,
                    countryCode: '',
                    classificationId: 'KZFzniwnSyZfZ7v7nJ',
                    page: page.toString(),
                    genreId: genreId,
                    keyword: searchValue,
                },
            },
        );
        if (response.data._embedded && response.data._embedded.events)
            return response.data._embedded.events;
        else
            return [];
    } catch (error) {
        console.log("error", error);
        return [];
    }
}

async function getGenres(): Promise<GenreI[]> {
    try {
        const response: AxiosResponse<{ segment?: { _embedded?: { genres?: GenreI[] } } }> = await axios.get(
            'https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ',
            {
                params: {
                    apikey: API_KEY,
                },
            },
        );
        if (response.data.segment && response.data.segment._embedded && response.data.segment._embedded.genres)
            return response.data.segment._embedded.genres;
        else
            return [];
    } catch (error) {
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
        return response.data._embedded.events;
    } catch (error) {
        console.log("error", error);
        return [];
    }
}

export {getEvents, getGenres, getEventsByGenre, getPortfolio};