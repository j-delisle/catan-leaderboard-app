import { useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import useUpdateUserSettings from '../../hooks/useUpdateUserSettings';
import ErrorAlertBanner from '../../components/ErrorAlertBanner';
import SuccessAlertBanner from '../../components/SuccessAlertBanner';

export function UserSettings() {
  const user_data = useLoaderData();

  const [email, setEmail] = useState(user_data.email);
  const [username, setUsername] = useState(user_data.username);
  const [pfp, setPfp] = useState(user_data.pfp_url);
  const [file, setFile] = useState(undefined);
  const { updateUserSettings, isLoading, error, success, new_pfp } =
    useUpdateUserSettings();

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('pfp', file);

    await updateUserSettings(formData);

    // TODO: Below if broken - need to refresh pfp when new one is uploaded
    if (new_pfp != pfp) {
      console.log('old url', pfp);
      setPfp(new_pfp);
      console.log('new url', new_pfp);
    }
  };

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
      <div className='text-left'>
        <h2 className='text-base font-semibold leading-7 text-white'>
          Personal Information
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-400'>
          Update your personal information to make your account your own!
        </p>
      </div>

      <form className='md:col-span-2' onSubmit={handleSave}>
        <div className='flex flex-col space-y-10'>
          <div className='col-span-full flex items-center gap-x-8'>
            <img
              src={pfp}
              alt=''
              className='h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover'
            />
            <div>
              <input
                type='file'
                className='min-w-[100px] rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20'
                name='image'
                onChange={handleFile}
              />
              <button
                type='button'
                className='min-w-[100px] rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20'
              >
                Change avatar
              </button>
              <p className='mt-2 text-xs leading-5 text-gray-400'>
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>

          <div className='col-span-full'>
            <label
              htmlFor='email'
              className='text-left block text-sm font-medium leading-6 text-white'
            >
              Email address:
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='email'
                className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='col-span-full'>
            <label
              htmlFor='username'
              className='text-left block text-sm font-medium leading-6 text-white'
            >
              Username:
            </label>
            <div className='mt-2'>
              <div className='flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'>
                <input
                  type='text'
                  name='username'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete='username'
                  className='ml-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='text-left py-2'>
          {error && <ErrorAlertBanner msg={error} />}
          {success && <SuccessAlertBanner msg={success} />}
        </div>
        <div className='mt-8 flex'>
          <button
            disabled={isLoading}
            type='submit'
            className='min-w-[100px] rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

// User data loader
export const userSettingsLoader = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const res = await fetch(`http://localhost:8000/users/${user.id}`);
    const data = await res.json();
    return data;
  } else {
    return redirect('/login');
  }
};
