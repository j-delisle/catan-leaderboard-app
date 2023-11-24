import { useLoaderData } from 'react-router-dom';
import PostGameForm from './PostGameForm';

export function PostGame() {
  const data = useLoaderData();
  return <PostGameForm data={data} />;
}

//loader func
export const postgameLoader = async () => {
  const res = await Promise.all([
    fetch('http://localhost:8000/users'),
    fetch('http://localhost:8000/expansion_options'),
  ]);
  const data = await Promise.all(res.map((r) => r.json()));

  return data;
};
