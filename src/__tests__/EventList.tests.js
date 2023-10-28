/* eslint-disable testing-library/render-result-naming-convention */
import { render, within, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import App from '../App';
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

describe('<EventList /> integration', () => {
    test('renders a list of 32 events when the app is mounted and rendered', async () => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
        });
    });
});
