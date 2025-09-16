// src/layouts/AuthLayout.jsx
import React from "react";

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* ---------- Left Side (Image / Illustration) ---------- */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden flex items-center justify-center">
                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                    alt="Auth Illustration"
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/60 via-purple-600/50 to-pink-600/50" />

                {/* Branding Text */}
                <div className="absolute text-white px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
                        Welcome Back 👋
                    </h1>
                    <p className="mt-2 md:mt-3 text-sm md:text-lg opacity-90">
                        Login or Register to continue exploring our awesome platform.
                    </p>
                </div>
            </div>

            {/* ---------- Right Side (Form) ---------- */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
                <div className="shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
