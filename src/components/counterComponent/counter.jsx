import { useState } from "react";
import PropTypes from 'prop-types';


export const Counter = ({ initialValue }) => {
    const [value, setValue] = useState(initialValue);

    const incrementValue = () => {
        setValue(value + 1);
    }

    const decrementValue = () => {
        setValue(value - 1);
    }
    return (
        <div className="counter">
            <h1 className="counter-value" data-testid="counter-value">{value}</h1>
            <div className="up-down-counters">
                <button className="up-counter" data-testid="up-counter" onClick={incrementValue}>+</button>
                <button className="down-counter" data-testid="down-counter" onClick={decrementValue}>-</button>
            </div>
        </div>
    );
}

Counter.propTypes = {
    initialValue: PropTypes.string.isRequired,
};

Counter.defaultProps = {
    initialValue: '',
};

