import { motion } from "framer-motion";

const FormLayout = ({ title, subtitle, children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md relative overflow-hidden"
        >
            {/* Decorative Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 rounded-2xl blur-2xl -z-10"
            />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-center mb-6"
            >
                <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>
                )}
            </motion.div>

            {/* Form Body */}
            <motion.form
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 },
                    },
                }}
                className="flex flex-col gap-5"
            >
                {children &&
                    Array.isArray(children) &&
                    children.map((child, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {child}
                        </motion.div>
                    ))}

                {/* if single child passed */}
                {!Array.isArray(children) && (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                )}
            </motion.form>
        </motion.div>
    );
};

export default FormLayout;
