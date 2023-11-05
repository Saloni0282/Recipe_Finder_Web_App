import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });

            // Check the response status and handle success/failure
            if (response.status === 200) {
                // User authenticated successfully, you can redirect or perform other actions

                const token = response.data.token
                localStorage.setItem('token', token)
                console.log(response);
                alert('User logged in successfully.')
                window.location.href = "/"
                console.log('User logged in successfully.');
            } else {
                alert(response.data.msg);
            }
        } catch (err) {
        
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
