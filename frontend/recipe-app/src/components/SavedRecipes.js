// SavedRecipes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/fetchRecipe.css';

const SavedRecipes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const apiUrl = 'http://localhost:8000/getRecipe';
        const headers = {
            Authorization: `${token}`, // Include 'Bearer' before the token
        };

        axios.get(apiUrl, { headers })
            .then((response) => {
                if (response.data.length > 0) {
                    setData(response.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [token]);

    const navigate = useNavigate();

    const handleMoreInfoClick = (foodId) => {
        navigate(`/recipe-info/${foodId}`);
    };

    const handleRemoveFavoriteClick = (recipeId) => {
        const apiUrl = `http://localhost:8000/deleteRecipe/${recipeId}`;
        const headers = {
            Authorization: `${token}`,
        };

        axios.delete(apiUrl, { headers })
            .then((response) => {
                if (response.status === 200) {
                    // Recipe removed successfully
                    alert(response.data.msg);
                    const updatedData = data.filter((recipe) => recipe._id !== recipeId);
                    setData(updatedData);
                }
            })
            .catch((err) => {
                setError(err);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            {data.length > 0 ? (
                data.map((recipe, index) => (
                    <div className="card" key={index}>
                        <div className="image">
                            <img src={recipe.image} alt={recipe.title} />
                        </div>
                        <div className="title">
                            <h3>{recipe.title}</h3>
                        </div>
                        <div className="summary">{recipe.summary}</div>
                        <div className="buttons">
                            <button
                                className="more_info"
                                onClick={() => handleMoreInfoClick(recipe.food_id)}
                            >
                                More Info
                            </button>
                            <button className="remove" onClick={() => handleRemoveFavoriteClick(recipe._id)}>Remove Favorite</button>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className='nsr'>No Saved Recipes!</h1>
            )}
        </div>
    );
};

export default SavedRecipes;
