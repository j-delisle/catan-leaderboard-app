import { NavLink, Outlet } from 'react-router-dom';

const profileNav = [
  { name: 'Settings', href: '/user/profile/settings', current: true },
  { name: 'Games Played', href: '/user/profile/games', current: false },
];

export function ProfileLayout() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div>
        <div className='xl:pl-72'>
          <main>
            <header className='border-b border-white/5'>
              {/* Secondary navigation */}
              <nav className='flex overflow-x-auto py-4'>
                <ul
                  role='list'
                  className='flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8'
                >
                  {profileNav.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={item.current ? 'text-indigo-400' : ''}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>

            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
