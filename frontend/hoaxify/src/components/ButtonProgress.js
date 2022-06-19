import React from 'react'

const ButtonProgress = (props) => {
    const { onClick, pendingApiCall, disabled, text } = props;
    return (
        <button className="btn btn-primary btn-lg" disabled={disabled}
            onClick={onClick}>
            {
                pendingApiCall &&
                <span className="spinner-border spinner-border-sm"></span>
            }
            {text}
        </button>
    )
}

export default ButtonProgress;