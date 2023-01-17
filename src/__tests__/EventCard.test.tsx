import React from 'react';
import {render, fireEvent, getByTestId} from '@testing-library/react';
import { EventCard } from '../components/EventCard';
import mockEvent from "./mockEvent";

describe('EventCard', () => {

    it('renders the correct event image', () => {
        const { getByAltText } = render(<EventCard event={mockEvent}/>);
        const eventImage = getByAltText('event');
        expect(eventImage).toBeInTheDocument();
        expect(eventImage.getAttribute('src')).toBe('https://s1.ticketm.net/img/tat/cft1/201504/13/621300.jpg');
    });

    it('opens and closes the EventInfoCard when clicked', () => {
        const { getByTestId, queryByTestId } = render(<EventCard event={mockEvent}/>);
        const eventCard = getByTestId('event-card');
        fireEvent.click(eventCard);
        expect(getByTestId('event-info-card')).toBeInTheDocument();
        fireEvent.click(eventCard);
        expect(queryByTestId('event-info-card')).toBeNull();
    });

    it('opens the EventInfoCard when clicked and check if the correct event info is displayed', () => {
        const { getByTestId, getByText } = render(<EventCard event={mockEvent}/>);
        const eventCard = getByTestId('event-card');
        fireEvent.click(eventCard);
        expect(getByTestId('event-info-card')).toBeInTheDocument();
        expect(getByText('HKO: Loppiaiskonsertti: Joe Hisaishi')).toBeInTheDocument();
        expect(getByText('2023-01-06 @ 15:00:00')).toBeInTheDocument();
        expect(getByText('MUSIIKKITALO, konserttisali, Helsinki, Finland')).toBeInTheDocument();
    });
});
