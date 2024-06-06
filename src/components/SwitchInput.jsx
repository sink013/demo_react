import { Switch } from "antd";
import React from "react";

const SwitchInput = ({ value = "0", onChange }) => {
  return (
    <div>
      <Switch
        checked={value.toString() === "1"}
        onChange={(e) => {
          onChange(e ? "1" : "0");
        }}
      />
    </div>
  );
};

export default SwitchInput;
