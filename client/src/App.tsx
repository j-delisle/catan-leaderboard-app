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
import { PostGame, postgameLoader } from './pages/post_game/PostGame';
import { useAuthContext } from './hooks/useAuthContext';
import { ProfileLayout } from './layouts/ProfileLayout';
import { UserInfo } from './pages/profile/UserInfo';
import { UserGames } from './pages/profile/UserGames';
import { userSettingsLoader } from './pages/profile/UserSettings';
import { leaderboardLoader } from './pages/leaderboard/LeaderboardTable';

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route
          path='leaderboard'
          element={<Leaderboard />}
          loader={leaderboardLoader}
        />
        <Route path='user'>
          <Route
            path='profile'
            element={user ? <ProfileLayout /> : <Navigate to='/login' />}
          >
            <Route
              path='settings'
              element={user ? <UserInfo /> : <Navigate to='/login' />}
              loader={userSettingsLoader}
            />
            <Route
              path='games'
              element={user ? <UserGames /> : <Navigate to='/login' />}
            />
          </Route>
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
