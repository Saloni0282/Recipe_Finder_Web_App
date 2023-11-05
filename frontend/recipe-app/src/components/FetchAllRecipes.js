
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/fetchRecipe.css';
import { useNavigate } from 'react-router-dom';

const FetchAllRecipes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchRecipes();
    }, []);

    const navigate = useNavigate();

    const search = (query) => {
        
        fetchRecipes(query)
    }
    const handleMoreInfoClick = (foodId) => {
        navigate(`/recipe-info/${foodId}`, { foodId: foodId });
    };

    const handleFavoriteClick = (recipeId, title, image) => {
        const apiUrl = 'http://localhost:8000/save';

        const dataToSave = {
            food_id: recipeId,
            title,
            image,
        };

        const headers = {
            Authorization: `${token}`,
        };

        axios
            .post(apiUrl, dataToSave, { headers })
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.msg);
                    const updatedData = data.filter((recipe) => recipe.id !== recipeId);
                    setData(updatedData);
                } else {
                    alert(response.data.msg);
                }
            })
            .catch((err) => {
                setError(err);
                console.error('Error saving recipe:', err);
            });
    };
    const fetchRecipes = (searchQuery) => {
        
        const apiUrl = 'http://localhost:8000/get';
        const headers = {
            Authorization: `${token}`,
        };

        
        if (searchQuery) {
            
            axios
                .get(apiUrl, { params: { query: searchQuery }, headers })
                .then((response) => {
                    setData(response.data.results);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        } else {
            
            axios
                .get(apiUrl, { headers })
                .then((response) => {
                    setData(response.data.results);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        }
    };


    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search by recipe name"
                
                onChange={(e) => search(e.target.value)}
            />

            {data.map((recipe, index) => (
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
                            data-id={recipe.id}
                            onClick={() => handleMoreInfoClick(recipe.id)}
                        >
                            More Info
                        </button>

                        <button
                            className="save"
                            data-id={recipe.id}
                            onClick={() => handleFavoriteClick(recipe.id, recipe.title, recipe.image)}
                        >
                            Favorite
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FetchAllRecipes;
