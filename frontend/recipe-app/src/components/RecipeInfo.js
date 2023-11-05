import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/recipeinfo.css';

function RecipeInfo() {
    const [recipeDetails, setRecipeDetails] = useState({});
    const { foodId } = useParams(); 
    const token = localStorage.getItem("token");

    useEffect(() => {
        const apiUrl = `http://localhost:8000/info/${foodId}`;

        const headers = {
            Authorization: `${token}`,
        };

        axios.get(apiUrl, { headers })
            .then((response) => {
                setRecipeDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching recipe details:', error);
            });
    }, [foodId, token]);

    return (
        <div className="container">
            <div className="longcard">
                <div className="flex">
                    <div className="img">
                        <img src={recipeDetails.image} alt={recipeDetails.title} />
                    </div>
                    <div className="details">
                        <h5 className="name">{recipeDetails.title}</h5>
                        <div className="description" dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}></div>
                    </div>
                </div>

                <div className="ingredients">
                    <h6>Ingredients:</h6>
                    <p>
                        {recipeDetails.ingredientsNames && recipeDetails.ingredientsNames.map((ingredient, index) => (
                            <span key={index}>{ingredient}, </span>
                        ))}
                    </p>
                </div>

                <div className="instructions">
                    <h6>Instructions:</h6>
                    <p className="instruction-text" >{recipeDetails.instructions}</p>
                </div>

                <div className="nutritions">
                    <h6>Nutritional Information:</h6>
                    <p>
                        {recipeDetails.nutritionsNames && recipeDetails.nutritionsNames.map((nutrition, index) => (
                            <span key={index}><strong>{nutrition},</strong> {recipeDetails[nutrition]}</span>
                        ))}
                    </p>
                </div>

                <div className="buttons">
                    <button className="save">Save</button>
                </div>
            </div>
        </div>
    );
}

export default RecipeInfo;
