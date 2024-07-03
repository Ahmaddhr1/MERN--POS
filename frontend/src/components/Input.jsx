import React from "react";

const Input = ({ id, name, label, type, className,value,onChange,step }) => {
  return (
    <div className={`flex gap-1 md:w-[400px] w-full '${className}`}>
      <label htmlFor={id} className="md:w-fit w-[120px]">
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
