import { motion } from "framer-motion";

const Input = ({
    name,
    value,
    placeholder,
    onChange,
    type = "text"
}) => {
    return (
        <motion.input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="border border-gray-300 rounded-xl px-4 py-2.5 w-full 
                       focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                       outline-none transition-all duration-300 shadow-sm 
                       placeholder-gray-400 text-gray-700"
        />
    );
};

export default Input;
