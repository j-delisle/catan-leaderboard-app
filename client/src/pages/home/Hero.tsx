import { NavLink } from "react-router-dom";

export default function Hero() {
    return (
        <div className="bg-white">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Boost your productivity.
                        <br />
                        Start using our app today.
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        Incididunt sint fugiat pariatur cupidatat consectetur
                        sit cillum anim id veniam aliqua proident excepteur
                        commodo do ea.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-y-6 w-full">
                        <NavLink
                            to="/login"
                            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Log In
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/leaderboard"
                            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            See Leaderboard
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
