interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  size: "sm" | "md" | "lg";
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4 text-lg mt-2",
  lg: "py-4 px-6",
};

const defaultStyles = "rounded-md px-4 py-2 onhover: cursor-pointer";

const variantStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}
      onClick={props.onClick}
      type={props.type}
      disabled={props.loading}
    >
      <div className="flex items-center justify-center ">{props.text}</div>
    </button>
  );
};
