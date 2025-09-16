import { useState } from "react";
import FormLayout from "../../layout/FormLayout";
import Input from "../common/Input";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Email: ${form.email}, Password: ${form.password}`);
    };

    return (
        <FormLayout
            title="Welcome Back"
            subtitle="Please login to your account"
        >
            <Input
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
            />
            <Input
                name="password"
                type="password"
                value={form.password}
                placeholder="Enter your password"
                onChange={handleChange}
            />

            <div className="flex justify-center">
                <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    Forget Password
                </Link>
            </div>

            <Button type="submit" label="Login" handleClick={handleSubmit} />

            <div className="flex justify-center">
                <Link
                    to="/register"
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    Register Now
                </Link>
            </div>
        </FormLayout>
    );
};

export default LoginForm;
