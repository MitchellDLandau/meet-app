
const NumberOfEvents = ({ setCurrentNOE }) => {

    const fetchNOE = (NOE) => {
        const NOEValue = NOE.target.value;
        setCurrentNOE(NOEValue);
    }

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