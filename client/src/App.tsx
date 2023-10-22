import {
  createBrowserRouter,
  createRoutesFromElements,
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='leaderboard' element={<Leaderboard />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
