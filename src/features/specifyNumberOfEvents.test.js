import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
let AppComponent;
defineFeature(feature, test => {
    test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        given('The user had selected a city', () => {
            AppComponent = render(<App />);
        });

        when('The user does not specify a number of events to be displayed', () => {

        });

        then(/^The users number of events displayed should default to (\d+) events$/, async (arg0) => {
            await waitFor(() => {
                const numberOfEvents = screen.queryAllByRole('listitem')
                expect(numberOfEvents.length).toEqual(32);
            })

        });
    });
    test('User can change the number of events displayed.', ({ given, when, then }) => {
        given('the user had selected a city to view events', () => {
            AppComponent = render(<App />);
        });

        when('the user inputs how many events are to be shown', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            const NOETextBox = within(NumberOfEventsDOM).queryByRole('textbox');
            await user.type(NOETextBox, "{backspace}{backspace}10");
        });

        then('The amount of events directed by the user should be displayed', () => {
            const AppDOM = AppComponent.container.firstChild;
            const allRenderedEvents = within(AppDOM).queryAllByRole('listitem');
            expect(allRenderedEvents.length).toEqual(10);
        });
    });
});