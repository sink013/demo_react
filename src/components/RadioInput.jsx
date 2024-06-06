import React from "react";

const RadioInput = ({ value = "", onChange, options = [] }) => {
  const fn = (e) => {
    let val = e.target.value;
    onChange(val);
  };
  return (
    <div>
      {options.map((v, i) => (
        <label key={i}>
          <input
            type="radio"
            checked={value === v.value}
            value={v.value}
            onChange={fn}
          />
          {v.label}
        </label>
      ))}
    </div>
  );
};

export default RadioInput;
