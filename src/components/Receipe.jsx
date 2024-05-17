import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import FavoriteRecipes from './FavoriteRecipes';
import logo from '../assets/logo.jpg'; 
import bgImg from '../assets/R.png';
import { Link } from 'react-router-dom';

function Receipe() {
  return (
    <div>
      <div className="container mx-auto py-8 px-4">
        <div className="flex mb-8">
          <div className="mr-auto">
            <Link to='/'>
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
          </div>
          <SearchForm />
        </div>
        <div>
          <SearchResults />
        </div>
      </div>
    </div>
  );
}

export default Receipe;
