import React, { createContext, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from './Pages/Articles/Articles';
import AddArticle from './Pages/Articles/AddArticles';
import Home from './Pages/Home/Home';
import ModifyArticle from './Pages/Articles/ModifyArticle';
import SignIn from './Pages/Login/SignIn';
import SignUp from './Pages/Login/SignUp';
import Main from './Pages/Main/Main';
import ActivateAccount from './Pages/Login/ActivateAccount';
import ForgetPassword from './Pages/Login/Forgetpassword';
import ResetPassword from './Pages/Login/ResetPassword';

export const UserContext = createContext();

const App = () => {
  const [isChange, setIsChange] = useState(false)
  return (
    <UserContext.Provider value={{ isChange: isChange, setIsChange: setIsChange }}>
      <Routes>
        <Route element={<Main />}>
          <Route index element={<Home />} />
          <Route path='/items/sub' >
            <Route path=":id" element={<Articles />} />
            <Route path=":id/add-article" element={<AddArticle />} />
            <Route path=":id/article/:aid" element={<ModifyArticle />} />
          </Route>
        </Route>
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='activate_account' element={<ActivateAccount />} />
        <Route path='forget_password' element={<ForgetPassword />} />
        <Route path='reset_password' element={<ResetPassword />} />
      </Routes>
    </UserContext.Provider>
  );
}

export const User = () => {
  const user = useContext(UserContext)
  return user
}

export default App
