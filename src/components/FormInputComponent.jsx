import React from 'react';

const FormInput = ({
  type = 'text',
  label,
  name,
  value,
  validation,
  handleOnChange
}) => (
  <div className="form-group mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={label}
      value={value}
      className={`form-control ${validation ? 'is-invalid' : ''}`}
      onChange={handleOnChange}
    />
    {validation && (
      <div className="invalid-feedback">
        {validation}
      </div>
    )}
  </div>
);

export default FormInput;