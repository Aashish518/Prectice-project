import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import FormLayout from "../../layout/FormLayout";

const RegisterForm = () => {
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [serverOtp, setServerOtp] = useState(""); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSendOtp = () => {
        const generatedOtp = "1234";
        setServerOtp(generatedOtp);
        setOtpSent(true);
        setOtpVerified(false);
        alert(`OTP ${generatedOtp} sent to ${form.email}`);
    };

    const handleVerifyOtp = () => {
        if (form.otp === serverOtp) {
            setOtpVerified(true);
            alert("OTP Verified Successfully ✅");
        } else {
            alert("Invalid OTP ❌");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otpVerified) {
            alert("Please verify your OTP before registering");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert(JSON.stringify(form, null, 2));
    };

    return (
        <FormLayout
            title="Create Account"
            subtitle="Register to get started"
        >
            <Input
                name="name"
                value={form.name}
                placeholder="Enter your name"
                onChange={handleChange}
            />

            <Input
                name="mobile"
                value={form.mobile}
                placeholder="Enter your mobile"
                onChange={handleChange}
            />

            {/* Email field */}
            <Input
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
                disabled={otpSent}
            />

            {!otpSent && (
                <Button label="Send OTP" handleClick={handleSendOtp} />
            )}

            {otpSent && !otpVerified && (
                <div className="flex space-x-2">
                    <Input
                        name="otp"
                        value={form.otp}
                        placeholder="Enter OTP"
                        onChange={handleChange}
                    />
                    <Button label="Verify OTP" handleClick={handleVerifyOtp} />
                </div>
            )}

            {otpVerified && (
                <p className="text-green-600 text-sm font-semibold -mt-2">
                    ✅ Email Verified
                </p>
            )}


            <Input
                name="password"
                type="password"
                value={form.password}
                placeholder="Enter your password"
                onChange={handleChange}
            />

            <Input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                placeholder="Confirm your password"
                onChange={handleChange}
            />

            <Button type="submit" label="Register" handleClick={handleSubmit} />
        </FormLayout>
    );
};

export default RegisterForm;
