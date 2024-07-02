import React from "react";

const Input = ({ id, name, label, type, className,value,onChange,step }) => {
  return (
    <div className={`flex gap-1 w-[300px] '${className}`}>
      <label htmlFor={id} className="w-[70px]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        min="0"
        step={step}
        className={`border border-gray-950 outline-none px-1`}
      />
    </div>
  );
};

export default Input;
