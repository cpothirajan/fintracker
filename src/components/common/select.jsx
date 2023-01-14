import React from "react";

const Select = ({
  name,
  label,
  value,
  items,
  error,
  textProperty,
  onChange,
}) => {
  let counter = 1;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        className="form-select"
        onChange={onChange}
      >
        <option value="" />
        {items.map((item) => (
          <option key={item._id || counter++} value={item._id}>
            {item[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Select;
