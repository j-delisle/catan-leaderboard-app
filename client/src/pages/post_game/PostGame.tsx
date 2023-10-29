import { useLoaderData } from 'react-router-dom';
import PostGameForm from './PostGameForm';

export function PostGame() {
  const data = useLoaderData();
  return <PostGameForm data={data} />;
}

//loader func
export const postgameLoader = async () => {
  const res = await fetch('http://localhost:8000/expansion_options');

  //   const users = await fetch('http://localhost:8000/users');
  //   console.log('users', users.json());
  return res.json();
  // users: users.json(),
};
