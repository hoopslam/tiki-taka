import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { GoVerified } from 'react-icons/go';
import { User } from '../types';

interface Props {
    user: User;
}

const UserCard = ({ user }: Props) => {
    return (
        <Link href={`/profile/${user._id}`}>
            <div className='flex items-start gap-3'>
                <div className='w-[24px] h-[24px]'>
                    <Image
                        src={
                            user.image ||
                            'https://lh3.googleusercontent.com/a/AEdFTp7JH6xt9yriZ1vRoxX2g-EIhspXPfikmz2e7fBc=s96-c'
                        }
                        width={24}
                        height={24}
                        className='rounded-full'
                        alt='user profile'
                        layout='responsive'
                    />
                </div>
                <div className='hidden sm:block'>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                        {user.userName?.replaceAll(' ', '')}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>
                        {user.userName}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
