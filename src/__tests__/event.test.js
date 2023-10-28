/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event'
import Event from '../components/event';


describe('<event /> component', () => {

    let allEvents;
    beforeAll(async () => {
        allEvents = await getEvents();
    })

    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event key={1} event={allEvents[0]} />);
    })

    test('By default, event details section should be hidden and title is shown', () => {
        EventComponent.rerender(<Event event={allEvents[0]} />)
        expect(EventComponent.queryByText('Hide Details')).not.toBeInTheDocument();
    });
    test('Show details section when a user clicks on the show details button', async () => {
        EventComponent.rerender(<Event event={allEvents[0]} />);
        const user = userEvent.setup();
        const detailsButton = EventComponent.queryByText('Show Details');
        await user.click(detailsButton);
        expect(EventComponent.queryByText('Show Details')).not.toBeInTheDocument();
        expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
    });
    test('Hide details when the user clicks the hide details button', async () => {
        EventComponent.rerender(<Event event={allEvents[0]} />);
        const user = userEvent.setup();
        const detailsButton = EventComponent.queryByText('Show Details');
        await user.click(detailsButton);
        const hideDetailsButton = EventComponent.queryByText('Hide Details');
        await user.click(hideDetailsButton);
        expect(EventComponent.queryByText('Hide Details')).not.toBeInTheDocument();
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    });

    test('An element for the events summary is displayed', async () => {
        EventComponent.rerender(<Event event={allEvents[0]} />)
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });
    test('An element for the events start time', async () => {
        EventComponent.rerender(<Event event={allEvents[0]} />)
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });
    test('An element for the events location', async () => {
        EventComponent.rerender(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });
    test('renders event details button with the title (show details)', async () => {
        EventComponent.rerender(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByRole('button')).toBeInTheDocument();
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
        expect(EventComponent.queryByText('Hide Details')).not.toBeInTheDocument();
    });
});
