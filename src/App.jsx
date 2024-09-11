import './App.css';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';

import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { selectAuthIsRefreshing } from './redux/auth/selectors';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  // const token = useSelector(selectAuthToken);

  useEffect(() => {
    // перед запуском санки перевіриться умова на наявність токена,
    // якщо токен є то санка виконається інакше ні
    // if (!token) return;
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <p>User is refreshing.</p>
  
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/contacts"
            element={<PrivateRoute component={<ContactsPage />} />}
          />

          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegistrationPage />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;