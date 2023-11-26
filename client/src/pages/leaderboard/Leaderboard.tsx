import { useLoaderData } from 'react-router-dom';
import LeaderboardTable from './LeaderboardTable';

export function Leaderboard() {
  const data = useLoaderData();
  return (
    <>
      <h1>Leaderboard Page</h1>
      <LeaderboardTable data={data} />
    </>
  );
}

// leaderboard loader function
export const leaderboardLoader = async () => {
  const res = await fetch('http://localhost:8000/leaderboard');
  const data = await res.json();
  return data;
};
