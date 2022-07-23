import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cuisine from './Cuisine';
import Home from './Home';
import Recipe from './Recipe';
import Searched from './Searched';

function Pages() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/searched/:search" element={<Searched />} />
          <Route path="/recipe/:name" element={<Recipe />} />
        </Routes>
      </main>
    </AnimatePresence>
  );
}

export default Pages;
