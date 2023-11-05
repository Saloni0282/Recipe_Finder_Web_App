import React from 'react';
// import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>

                <li><a href="/">Home</a></li>
                <li><a href="/saved-recipes">Saved Recipes</a></li>
                {/* <li><a href="/recipe-info/?id=${foodid}">Recipe Info</a></li> */}
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>

            </ul>
        </nav>
    );
}

export default Navbar;
