import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { MdLogout } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { getUser } from '../utils';
import useAuthStore from '../store/authStore';
import ThemeToggler from './ThemeToggler';

const Navbar = () => {
    const { userProfile, addUser, removeUser } = useAuthStore();
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const router = useRouter();

    const logOut = () => {
        googleLogout();
        removeUser();
        setDropDownMenu(false);
    };

    const handleSearch = (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (searchValue) {
            router.push(`/search/${searchValue}`);
        }
    };

    return (
        <div className='w-full border-b-2 border-gray-200 py-2 px-4 flex justify-center'>
            <div className='flex justify-between items-center w-full max-w-6xl'>
                <Link href='/'>
                    <button className='text-red-500 flex items-center justify-center whitespace-nowrap'>
                        <AiOutlineVideoCamera size={30} />
                        <span className='ml-2 text-lg font-black hidden sm:inline-block'>
                            Tiki Taka
                        </span>
                    </button>
                </Link>
                <div className='relative hidden md:block'>
                    <form
                        onSubmit={handleSearch}
                        className='absolute md:static top-10 -left-20 bg-white'
                    >
                        <input
                            type='text'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder='Search'
                            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
                        />
                        <button
                            onClick={handleSearch}
                            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
                        >
                            <BiSearch />
                        </button>
                    </form>
                </div>
                <div className='flex justify-evenly items-center'>
                    {userProfile ? (
                        <div className='flex gap-5 md:gap-10 items-center'>
                            <Link href='/upload'>
                                <button className='border-2 px-2 py-1 md:px-4 text-md font-semibold flex items-center gap-2 hover:bg-gray-100'>
                                    <AiOutlineVideoCameraAdd size={24} />
                                    <span className='hidden md:block'>
                                        Upload
                                    </span>
                                </button>
                            </Link>
                            {userProfile.image && (
                                <div className='relative flex justify-center items-center'>
                                    <Image
                                        width={40}
                                        height={40}
                                        className='rounded-full cursor-pointer'
                                        onClick={() =>
                                            setDropDownMenu(
                                                (current) => !current
                                            )
                                        }
                                        src={userProfile.image}
                                        alt='profile avatar'
                                    />
                                    {dropDownMenu && (
                                        <div
                                            className='flex justify-center items-center absolute top-full drop-shadow-md rounded-md bg-white p-2 cursor-pointer whitespace-nowrap -left-2'
                                            onClick={logOut}
                                        >
                                            <MdLogout size={24} />
                                            <p className='ml-3'>Sign Out</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            <ThemeToggler />
                        </div>
                    ) : (
                        <div className='flex justify-center items-center'>
                            <GoogleLogin
                                onSuccess={(res) => getUser(res, addUser)}
                                onError={() => console.log(`error`)}
                            />
                            <ThemeToggler />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
