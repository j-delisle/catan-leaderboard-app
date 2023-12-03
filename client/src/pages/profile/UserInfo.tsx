import { UpdatePass } from './UpdatePass';
import { UserSettings } from './UserSettings';

export function UserInfo() {
  return (
    <div className='divide-y divide-white/5'>
      <UserSettings />
      <UpdatePass />

      {/* TODO : once backend API integrated for deleting user */}
      {/* <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-white'>
            Delete account
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>

        <form className='flex items-start md:col-span-2'>
          <button
            type='submit'
            className='rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400'
          >
            Yes, delete my account
          </button>
        </form>
      </div> */}
    </div>
  );
}
