import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Products from './components/Products.js'
import Restaurants from './components/Restaurants.js'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Restaurants/>}/>
          <Route path="/catalog" element={<Products/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
