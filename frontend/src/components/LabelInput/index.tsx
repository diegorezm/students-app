import {Input } from "../../styles/GlobalStyles";
import ColorScheme from "../../types/ColorScheme";

interface InputProps {
  label: string;
  value?: string | "";
  type?: string | "text";
  onChange?: (value: string) => void | null;
  colors: ColorScheme
}

export default function LabelInput({label, type, value, onChange, colors}: InputProps) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <Input
        type={type}
        id={label}
        value={value}
        colors={colors}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </>
  );
};
