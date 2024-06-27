import React, { createContext, useContext, useState } from 'react';
import Navigation from './components/Header/Navigation';
import { Route, Routes } from 'react-router-dom';
import Articles from './Pages/articles/Articles';
import AddArticle from './Pages/articles/AddArticles';
import Home from './Pages/Home/Home';
import ModifyArticle from './Pages/articles/ModifyArticle';

export const UserContext = createContext();

const App = () => {

  const [isChange, setIsChange] = useState(false)

  return (
    <UserContext.Provider value={{ isChange: isChange, setIsChange: setIsChange }}>
      <div className='main-container'>
        <Navigation />
        <div className="w-[100%] px-[1rem] md:px-[2rem] py-[2rem] overflow-auto h-[100vh] lg:w-[calc(100% - 300px)]">
          <Routes>
            <Route index element={<Home />} />
            <Route path='/items/sub' >
              <Route path=":id" element={<Articles />} />
              <Route path=":id/add-article" element={<AddArticle />} />
              <Route path=":id/article/:aid" element={<ModifyArticle />} />
            </Route>
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export const User = () => {
  const user = useContext(UserContext)
  return user
}

export default App
