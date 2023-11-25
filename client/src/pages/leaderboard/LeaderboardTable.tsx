export default function LeaderboardTable(data) {
  const users = data.data;
  console.log(users);
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  >
                    Username
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Wins
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Games Played
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Win Percentage
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {users.map((data) => (
                  <tr key={data.username}>
                    <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0'>
                      <div className='flex items-center'>
                        <div className='h-11 w-11 flex-shrink-0'>
                          <img
                            className='h-11 w-11 rounded-full'
                            // src={person.image}
                            alt=''
                          />
                        </div>
                        <div className='ml-4'>
                          {/* <div className='font-medium text-gray-900'>
                            {data.name}
                          </div> */}
                          <div className='mt-1 text-gray-500'>
                            {data.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='text-gray-900'>{data.win_count}</div>
                      {/* <div className='text-gray-900'>{person.title}</div> */}
                      {/* <div className='mt-1 text-gray-500'> */}
                      {/* {person.department} */}
                      {/* </div> */}
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                        Active
                      </span>
                    </td>
                    {/* <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      {data.role}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
