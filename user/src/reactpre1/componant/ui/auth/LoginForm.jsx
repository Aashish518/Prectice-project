import { useState } from "react";
import FormLayout from "../../layout/FormLayout";
import Input from "../common/Input";
import Button from "../common/Button";

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
            <Button type="submit" label="Login" handleClick={handleSubmit} />
        </FormLayout>
    );
};

export default LoginForm;
