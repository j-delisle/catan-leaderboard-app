import { NavLink, Outlet } from 'react-router-dom';

const profileNav = [
  { name: 'Settings', href: '/user/profile/settings' },
  { name: 'Stats', href: '/user/profile/stats' },
];

export function ProfileLayout() {
  return (
    <>
      <div className='h-full bg-gray-900 rounded-lg'>
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
                        className={({ isActive }) =>
                          isActive ? 'text-indigo-400' : ''
                        }
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
