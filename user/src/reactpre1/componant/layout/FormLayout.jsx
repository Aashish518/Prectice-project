import { motion } from "framer-motion";

const FormLayout = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
                className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative overflow-hidden"
            >
                {/* Decorative Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-3xl blur-xl -z-10" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-5"
                >
                    {children}
                </motion.form>
            </motion.div>
        </div>
    );
};

export default FormLayout;
