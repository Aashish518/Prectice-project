import { motion } from "framer-motion";

const Button = ({
    type = "button",
    label,
    handleClick,
    disabled = false
}) => {
    return (
        <motion.button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 
                text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-indigo-300 
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"}`}
        >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 hover:opacity-30 transition duration-500"></span>

            <span className="relative z-10">{label}</span>
        </motion.button>
    );
};

export default Button;
