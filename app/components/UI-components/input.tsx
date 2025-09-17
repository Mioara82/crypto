import React from "react";

type NativeProps = React.InputHTMLAttributes<HTMLInputElement> & {
  feature?: "converter" | "portfolio" | "investment" | string;
  show?:boolean;
  placeholder?: string;
};

const Input = React.forwardRef<HTMLInputElement, NativeProps>(function Input(
  { onChange, ...rest },
  ref,
) {
  return (
    <div className="z-1 relative">
      <input ref={ref} {...rest} onChange={onChange} />
    </div>
  );
});

export default Input;
