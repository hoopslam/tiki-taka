import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { categories } from '../utils/constants';
import { ImInsertTemplate } from 'react-icons/im';

const Discover = () => {
    const activeCategoryStyle = `xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#FF1997]`;
    const categoryStyle = `xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black`;

    const router = useRouter();

    return (
        <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
                Popular Categories
            </p>
            <div className='flex gap-3 flex-wrap'>
                {categories.map((category) => (
                    <Link
                        href={`/?category=${category.name}`}
                        key={category.name}
                    >
                        <div
                            className={
                                category.name === router.query.category
                                    ? activeCategoryStyle
                                    : categoryStyle
                            }
                        >
                            <span className='font-bold text-2xl xl:text-md'>
                                {category.icon}
                            </span>
                            <span className='font-medium text-md hidden xl:block capitalize'>
                                {category.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Discover;
