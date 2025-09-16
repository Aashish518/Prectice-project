const FormLayout = ({ title, subtitle, children }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold text-indigo-600">{title}</h1>
                {subtitle && (
                    <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                )}
            </div>

            {/* Form Body */}
            <form className="flex flex-col gap-4">
                {children}
            </form>
        </div>
    );
};

export default FormLayout;
