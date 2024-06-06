import React, { useState } from "react";

const CodeInput = ({ value = "", onChange }) => {
  const [text, setText] = useState("获取验证码");
  const [disabled, setDisabled] = useState(false);
  const countdown = () => {
    setDisabled(true);
    let count = 10;
    setText(`${count}s后重新获取`);
    let timer = setInterval(() => {
      count--;
      setText(`${count}s后重新获取`);
      if (count <= 0) {
        clearInterval(timer);
        setText(`重新获取`);
        setDisabled(false);
      }
    }, 1000);
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <button onClick={countdown} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default CodeInput;
