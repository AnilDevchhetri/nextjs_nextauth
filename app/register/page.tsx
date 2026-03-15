'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password != confirmPassword) {
            alert("Password do not match");
            return;
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "registration failed")
            }
            console.log(data);
            router.push("/login")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='flex items-center flex-col justify-center min-h-screen'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full max-w-md mx-auto p-6 shadow rounded-lg'>
                <input type="email" className='w-full bg-gray-100 text-black p-3 rounded-md outline-none border-none' placeholder='email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' className='w-full bg-gray-100 text-black p-3 rounded-md outline-none border-none' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='password' placeholder='confirm password' className='w-full bg-gray-100 text-black p-3 rounded-md outline-none border-none' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" className='w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer text-center'>Register</button>
            </form>
            <p>Alrady have an acocunt <a>Login</a></p>
        </div>
    )
}

export default RegisterPage