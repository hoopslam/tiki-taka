import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { GoVerified } from 'react-icons/go';
import { User } from '../types';

interface Props {
    user: User;
    avatarSize: number;
}

const UserCard = ({ user, avatarSize }: Props) => {
    return (
        <Link href={`/profile/${user._id}`}>
            <div className='flex items-start gap-3'>
                <div className={`w-[${avatarSize}px] h-[${avatarSize}px]`}>
                    <Image
                        src={user.image}
                        width={avatarSize}
                        height={avatarSize}
                        className='rounded-full'
                        alt='user profile'
                        layout='responsive'
                    />
                </div>
                <div className='hidden xl:block'>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                        {user.userName.replaceAll(' ', '')}
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
