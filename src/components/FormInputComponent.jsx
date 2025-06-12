import React from 'react';

const FormInput = ({
  type = 'text',
  label,
  name,
  value,
  validation,
  handleOnChange
}) => (
  <div id={name} className="form-group mb-3">
    <label htmlFor={name} id={name + "-label"} className="form-label">
      {label}
    </label>
    <input
      id={name + '-input'}
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