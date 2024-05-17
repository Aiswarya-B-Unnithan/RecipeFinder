import FavoriteRecipes from "./components/FavoriteRecipes";
import Home from "./components/Home";
import NoPageFound from "./components/NoPageFound";
import Receipe from "./components/Receipe";
import ReceipeDetails from "./components/ReceipeDetails";

import SearchResults from "./components/SearchResults";

import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/recipe/:id" element={<ReceipeDetails />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
          <Route path="/search" element={<Receipe/>} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
