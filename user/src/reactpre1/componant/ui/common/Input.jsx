const Input = ({
    name,
    value,
    placeholder,
    onChange,
    type = "text",
    error = false,
    disabled = false,
}) => {
    return (
        <div className="w-full flex flex-col gap-1">
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                className={`border rounded-xl px-4 py-2.5 w-full
          outline-none transition-all duration-200 shadow-sm
          placeholder-gray-400 text-gray-700
          ${disabled
                        ? "bg-gray-100 cursor-not-allowed opacity-70 border-gray-200"
                        : error
                            ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    }`}
            />
        </div>
    );
};

export default Input;
