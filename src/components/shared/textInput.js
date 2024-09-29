const TextInput = ({
    label,
    placeholder,
    className,
    value,
    setValue,
    labelClassName,
    error
  }) => {
    return (
      <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
        <label
          htmlFor={label}
          className={`font-semibold ${labelClassName} text-white`}
        >
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className={`p-3 border border-solid rounded placeholder-gray-500 ${
            error ? 'border-blue-400' : 'border-gray-500'
          }`}
          id={label}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {error && (
          <p className="text-blue-400 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  };
  
  export default TextInput;