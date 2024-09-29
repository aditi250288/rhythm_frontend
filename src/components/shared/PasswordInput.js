const PasswordInput = ({ label, placeholder, value, setValue, className, error, autoComplete }) => {
    return (
      <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
        <label htmlFor={label} className="font-semibold text-white">
          {label}
        </label>
        <input
          type="password"
          placeholder={placeholder}
          className={`p-3 border border-solid rounded placeholder-gray-500 ${
            error ? 'border-red-500' : 'border-gray-400'
          }`}
          id={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete={autoComplete}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  };

export default PasswordInput;