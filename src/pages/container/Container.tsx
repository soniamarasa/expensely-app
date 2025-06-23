import React from 'react';
import ProtectedRoute from '../../helpers/ProtectedRoute';
import RedirectRoute from '../../helpers/RedirectRoute';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Auth } from '../../pages/auth/Auth';
import { SignUp } from '../../pages/signup/SignUp';
import { RecoverPassword } from '../../pages/password/Password';
import { NotFound } from '../../pages/not-found/NotFound';
import { Home } from '../../pages/home/Home';
import { Expenses } from '../expenses/Expenses';
import { Tags } from '../../pages/tags/Tags';
import { User } from '../../pages/user/User';
import { Footer } from '../../components/footer/Footer';
import { Header } from '../../components/Header/Header';
// import { Reports } from '../../pages/reports/Reports';

export const Container = () => {
  const { theme } = React.useContext(ThemeContext) || {};
  const location = useLocation();
  const rotes = ['/auth', '/signup', '/password-reset'];

  return (
    <main
      className={
        theme &&
        (rotes.includes(location.pathname) ||
          location.pathname.includes('/password-reset'))
          ? 'light'
          : 'dark'
      }
    >
      <div className="container-root">
        <Header />

        <Routes>
          <Route
            path="/auth"
            element={
              <RedirectRoute>
                <Auth />{' '}
              </RedirectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectRoute>
                {' '}
                <SignUp />{' '}
              </RedirectRoute>
            }
          />
          <Route
            path="/password-reset/:token"
            element={
              <RedirectRoute>
                {' '}
                <RecoverPassword />
              </RedirectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tags"
            element={
              <ProtectedRoute>
                <Tags />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </main>
  );
};
