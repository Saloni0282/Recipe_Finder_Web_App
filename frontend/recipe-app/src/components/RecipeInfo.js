import React, { useState } from 'react';
import '../css/signup.css';
import axios from 'axios'; 

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            
            const response = await axios.post('http://localhost:8000/signup', {
                name,
                email,
                password,
            });

            
            if (response.status === 200) {
                
                alert(response.data.msg);
                window.location.href = "./login"
                console.log(response);

            } else {
                
                alert(response.data.msg);
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
        
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className="signup-container">
                <h1>Signup</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default Signup;
