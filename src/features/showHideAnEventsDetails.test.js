import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

const event = async () => {
    await getEvents();
}

defineFeature(feature, test => {
    let AppComponent;

    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('User has event elements displayed', () => {

        });

        when('User opens the app', () => {
            AppComponent = render(<Event event={event} />);
        });

        then('The list of events chould be displaying without their details', () => {

            expect(screen.queryByText("Show Details")).toBeInTheDocument();
        });
    });
    test('User can expand an event to see details.', ({ given, when, then }) => {
        given('The Event list has been loaded', () => {
            AppComponent = render(<Event event={event} />);
        });

        when('user selects an event', async () => {
            const user = userEvent.setup();
            const detailsButton = screen.getByText("Show Details");
            await user.click(detailsButton);
        });

        then('the event should be expanded displaying more information about the event', () => {
            const hideDetails = screen.queryAllByText("Hide Details").length;
            expect(hideDetails).toBeGreaterThan(0);
        });
    });
    test('User can collapse an event to hide details.', ({ given, when, then }) => {
        given('User had selected an event and the event information was displayed along with a hide details button', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            const detailsButton = AppComponent.queryByText('Show Details');
            await user.click(detailsButton);
        });

        when('User clicks the hide details button', async () => {
            const user = userEvent.setup();
            const hideDetailsButton = AppComponent.queryByText('Hide Details');
            await user.click(hideDetailsButton);
        });

        then('The display should return to displaying the list of events in the city previously being looked at', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('.no-details');
            expect(details).toBeInTheDocument();
        });
    });
});