import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const navigation = [
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Profile', href: '/user/profile' },
  { name: 'Post Game', href: '/user/post_game' },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useAuthContext();

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  const navLinks = navigation.map((item) => (
    <NavLink
      to={item.href}
      className='text-sm font-semibold leading-6 text-gray-900'
    >
      {item.name}
    </NavLink>
  ));
  const navMobile = navigation.map((item) => (
    <NavLink
      to={item.href}
      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
      reloadDocument
    >
      {item.name}
    </NavLink>
  ));

  return (
    <>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <NavLink to='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt=''
            />
          </NavLink>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>{navLinks}</div>
        {user && (
          <div className='flex flex-1 items-center justify-end gap-x-6'>
            <NavLink
              onClick={handleLogout}
              to='/login'
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Logout
            </NavLink>
          </div>
        )}
        {!user && (
          <div className='flex flex-1 items-center justify-end gap-x-6'>
            <NavLink
              to='/login'
              className='hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900'
            >
              Log in
            </NavLink>
            <NavLink
              to='/signup'
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign up
            </NavLink>
          </div>
        )}
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      </nav>

      {/* mobile navigation and menu */}

      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center gap-x-6'>
            <NavLink to='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                alt=''
              />
            </NavLink>
            <NavLink
              to='/signup'
              className='ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              reloadDocument
            >
              Sign up
            </NavLink>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <ul>{navMobile}</ul>
              </div>
              <div className='py-6'>
                <NavLink
                  to='/login'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  reloadDocument
                >
                  Log in
                </NavLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
