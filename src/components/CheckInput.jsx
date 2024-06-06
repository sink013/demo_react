import React from "react";

const CheckInput = ({ value = [], onChange, options = [] }) => {
  const fn = (e) => {
    let newVal = [...value];
    let val = e.target.value;
    if (e.target.checked) {
      newVal.push(val);
    } else {
      let index = newVal.indexOf(val);
      newVal.splice(index, 1);
    }
    onChange(newVal);
  };
  return (
    <div>
      {options.map((v, i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={value.includes(v.value)}
            value={v.value}
            onChange={fn}
          />
          {v.label}
        </label>
      ))}
    </div>
  );
};

export default CheckInput;
