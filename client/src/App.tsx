import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { RootLayout } from './layouts/RootLayout';

import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import { Home } from './pages/home/Home';
import { NotFound } from './pages/NotFound';
import { Leaderboard } from './pages/leaderboard/Leaderboard';
import { Profile } from './pages/profile/Profile';
import { PostGame, postgameLoader } from './pages/post_game/PostGame';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='leaderboard' element={<Leaderboard />} />
        <Route path='user'>
          <Route
            path='profile'
            element={user ? <Profile /> : <Navigate to='/login' />}
          />
          <Route
            path='post_game'
            element={user ? <PostGame /> : <Navigate to='/login' />}
            loader={postgameLoader}
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
