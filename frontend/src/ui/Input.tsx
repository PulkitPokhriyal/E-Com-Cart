import React from "react";

interface Inputprops {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
  name?: string;
  value?: string;
  required?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: "sm" | "md" | "lg";
  onBlur?: (e: React.FocusEvent) => void;
}

const sizeStyle = {
  sm: "py-1 pl-2 w-xs",
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
        onBlur={props.onBlur}
        onChange={props.onChange}
        type={props.type}
      />
    </div>
  );
};
