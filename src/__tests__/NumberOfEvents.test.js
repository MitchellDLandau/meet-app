import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
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

})