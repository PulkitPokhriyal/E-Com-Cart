import React from "react";

interface Inputprops {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
  name?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: "sm" | "md" | "lg";
}

const sizeStyle = {
  sm: "py-1 pl-2 w-sm",
  md: "py-2 pl-4 w-md",
  lg: "py-2 pl-4 w-xl",
};

export const Input = (props: Inputprops) => {
  return (
    <div>
      <input
        ref={props.reference}
        placeholder={props.placeholder}
        className={`${sizeStyle[props.size]} border rounded-sm m-2}`}
        name={props.name}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
      />
    </div>
  );
};
