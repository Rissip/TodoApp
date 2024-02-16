import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './Layout';
import Home from './page/Home';
import Todo from './page/Todo';
import Category from './page/Category';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/category" element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
