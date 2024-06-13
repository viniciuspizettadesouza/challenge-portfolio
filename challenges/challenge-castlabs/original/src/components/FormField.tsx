interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type: "text" | "number" | "date" | "textarea";
  rows?: number;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type,
  rows = 2,
  required = true,
}) => {
  const inputProps = {
    className: "w-full border border-gray-300 rounded-md px-3 py-2 mt-1",
    name,
    value,
    onChange,
    required,
  };

  let inputElement;
  if (type === "textarea") {
    inputElement = <textarea {...inputProps} rows={rows} />;
  } else {
    inputElement = <input {...inputProps} type={type} />;
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-600">
        {label}
      </label>
      {inputElement}
    </div>
  );
};

export default FormField;
