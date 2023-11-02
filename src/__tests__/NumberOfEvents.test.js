import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />);
        //unsure as to what I need to name the dummmy prop to fix test that breaks when adding integration test. 
    })

    test('renders text input for the number of events to be displayed', () => {
        const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberOfEventsTextBox).toBeInTheDocument();
    });
    test('Default value for number of events is 32', () => {
        const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberOfEventsTextBox).toHaveValue('32');
    });
    test('When a user edits textbox they can change the value displayed', async () => {
        const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        await userEvent.type(numberOfEventsTextBox, '{backspace}{backspace}16{Enter}');
        expect(numberOfEventsTextBox).toHaveValue('16')
    });
});

describe('<NumberOfEvents /> integration', () => {
    test('When the user changes the value of the “number of events” input field, correct number displays', async () => {
        const user = userEvent.setup();
        const appComponent = render(<App />);
        const AppDOM = appComponent.container.firstChild;
        const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
        const NOETextBox = within(NumberOfEventsDOM).queryByRole('textbox');
        await user.type(NOETextBox, "{backspace}{backspace}10");
        //        const allEvents = await getEvents(); Unsure if I need to load the events
        const allRenderedEvents = within(AppDOM).queryAllByRole('listitem');
        expect(allRenderedEvents.length).toEqual(10);
    });
});
