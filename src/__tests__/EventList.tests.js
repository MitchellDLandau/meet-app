/* eslint-disable testing-library/render-result-naming-convention */
import { render } from '@testing-library/react';
import { getEvents, extractSummaries } from '../api';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    })

    test('Has an element with "list" role', () => {
        // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });
    test('renders correct number of events', async () => {
        const allEvents = await getEvents();
        EventListComponent.rerender(<EventList events={allEvents} />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});


//2