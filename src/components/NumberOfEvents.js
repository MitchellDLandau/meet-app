
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

    const fetchNOE = (NOE) => {
        const NOEValue = NOE.target.value;
        setCurrentNOE(NOEValue);

        let errorText;
        if (NOEValue <= 0) {
            errorText = "You have to input a positive number. "
        }
        else if (isNaN(NOEValue)) {
            errorText = "You have to input numbers only."
        }
        else {
            errorText = ""
        }
        setErrorAlert(errorText);
    };

    return (
        <div id="number-of-events">
            <h4>Number of events</h4>
            <input
                type="text"
                defaultValue="32"
                onChange={fetchNOE}
            />
        </div>
    )
}

export default NumberOfEvents;