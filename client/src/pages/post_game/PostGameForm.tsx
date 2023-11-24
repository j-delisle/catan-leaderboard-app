import { useState } from 'react';
import usePostGame from '../../hooks/usePostGame';
import FormInput from '../../components/FormInput';
import ComboBox from '../../components/ComboBox';
import MenuSelect from '../../components/MenuSelect';

export default function PostGameForm({ data }) {
  const exp_opts = data[1].expansion_options;
  // const users = data[0];
  // const user_list = data[0].map((user) => user.username);
  const user_list = data[0];
  // console.log('usssserssssss', user_list);
  // console.log('data being printed out for both', exp_opts, user_list);
  const [winner, setWinner] = useState('');
  const [players, setPlayers] = useState([]);
  const [date, setDate] = useState('');
  const [expansion, setExpansion] = useState(exp_opts[0]);
  const { postGame, error, isLoading } = usePostGame();
  // console.log(data.expansion_options);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('winner', winner);
    formData.append('players', players);
    formData.append('date', date);
    formData.append('expansion', expansion);

    await postGame(formData);
  };
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Post a Catan Game Results
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            onSubmit={handleSubmit}
            action='#'
            method='POST'
          >
            <div>
              <FormInput
                label='Game Winner (username)'
                name='winner_username'
                state={winner}
                setState={setWinner}
              />

              <ComboBox
                label='Select Other Players'
                options={user_list}
                selected={players}
                setSelected={setPlayers}
              />
              <FormInput
                label='Game Date'
                name='date'
                type='date'
                setState={setDate}
              />
              <MenuSelect
                label='Select the Expansion Played'
                selected={expansion}
                setExpansion={setExpansion}
                expansions={exp_opts}
              />
            </div>

            <div>
              <div className='text-red-500'>
                {error && <p className='text-red-500'>{error}</p>}
              </div>
              <button
                disabled={isLoading}
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Submit Game Results
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
