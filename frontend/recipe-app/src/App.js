// App.js
import { Routes, Route } from 'react-router-dom';
import "./css/navbar.css"
import "./css/login.css"
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from "./components/Login";
import FetchAllRecipes from './components/FetchAllRecipes';
import RecipeInfo from './components/RecipeInfo';
import SavedRecipes from "./components/SavedRecipes";
import ErrorPage from './components/ErrorPage';


const App = () => {
    return (
        <>
            <Navbar />

            <Routes>

                <Route path='/' Component={FetchAllRecipes}></Route>
                <Route path='/signup' Component={Signup}></Route>
                <Route path='/login' Component={Login}> </Route>
                <Route path="/recipe-info/:foodId" Component={RecipeInfo}> </Route>
                <Route path='/saved-recipes' Component={SavedRecipes}> </Route>
                <Route path="*" Component={ErrorPage} ></Route>
            </Routes>

        </>
    );
};

export default App;