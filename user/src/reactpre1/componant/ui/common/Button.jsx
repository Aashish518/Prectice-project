const Button = ({
    type = "button",
    label,
    handleClick,
    disabled = false,
    variant = "default",
}) => {
    const variantClasses = {
        default:
            "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 focus:ring-indigo-300",
        red: "bg-gradient-to-r from-red-500 via-pink-600 to-rose-600 focus:ring-rose-300",
        green:
            "bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 focus:ring-emerald-300",
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={`relative overflow-hidden text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg 
                focus:outline-none focus:ring-2
                ${variantClasses[variant]} 
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"}
                transition duration-200 transform active:scale-95 hover:scale-105`}
        >
            <span
                className={`absolute inset-0 bg-gradient-to-r ${variant === "red"
                        ? "from-orange-500 via-red-500 to-pink-500"
                        : variant === "green"
                            ? "from-lime-400 via-green-500 to-emerald-500"
                            : "from-pink-500 via-purple-500 to-indigo-500"
                    } opacity-0 hover:opacity-30 transition duration-500`}
            ></span>

            <span className="relative z-10">{label}</span>
        </button>
    );
};

export default Button;
