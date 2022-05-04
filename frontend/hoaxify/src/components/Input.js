import React from "react";

const Input = (props) => {
    const { label, error, name, handleOnChange, type } = props;
    return (
        <div className="form-group">
            <label>{label}</label>
            <input className={error ? "form-control is-invalid" : "form-control"}
                name={name} onChange={handleOnChange} type={type} />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
}

export default Input;