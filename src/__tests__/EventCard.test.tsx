import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {EventCard} from '../components/EventCard';
// eslint-disable-next-line jest/no-mocks-import
import eventMock from "../__mocks__/eventMock";

describe('EventCard', () => {

    it('renders the correct event image', () => {
        render(<EventCard event={eventMock}/>);
        const eventImage = screen.getByAltText('event');
        expect(eventImage).toBeInTheDocument();
        expect(eventImage.getAttribute('src'))
            .toBe('https://s1.ticketm.net/img/tat/cft1/201504/13/621300.jpg');
    });

    it('opens and closes the EventInfoCard when clicked', () => {
        render(<EventCard event={eventMock}/>);
        const eventCard = screen.getByTestId('event-card');
        fireEvent.click(eventCard);
        expect(screen.getByTestId('event-info-card')).toBeInTheDocument();
        fireEvent.click(eventCard);
        expect(screen.queryByTestId('event-info-card')).toBeNull();
    });

    it('opens the EventInfoCard when clicked and check if the correct event info is displayed', () => {
        render(<EventCard event={eventMock}/>);
        const eventCard = screen.getByTestId('event-card');
        fireEvent.click(eventCard);
        expect(screen.getByTestId('event-info-card')).toBeInTheDocument();
        // noinspection SpellCheckingInspection
        expect(screen.getByText('HKO: Loppiaiskonsertti: Joe Hisaishi')).toBeInTheDocument();
        expect(screen.getByText('Friday, 2023-01-06 @ 15:00:00')).toBeInTheDocument();
        // noinspection SpellCheckingInspection
        expect(screen.getByText('MUSIIKKITALO, konserttisali, Helsinki, Finland')).toBeInTheDocument();
    });
});
