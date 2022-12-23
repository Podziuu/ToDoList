import React from "react";

const Input = React.forwardRef(
  ({ name, placeholder, type, errors, ...rest }, ref) => {
    const classes = errors[name]
      ? "border-red-500 focus:border-red-500"
      : "border-primary focus:border-primary";

    const labelName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <div className="py-2 flex flex-col">
        <label className="text-lg font-semibold ml-4 mb-1">{labelName}</label>
        <input
          className={`border ${classes} rounded-full py-2 px-4 w-full focus:border-2 outline-none`}
          placeholder={placeholder}
          type={type}
          name={name}
          {...rest}
          ref={ref}
        />
        {errors && (
          <span className="ml-4 pt-1 text-red-500">
            {errors[name]?.message}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
