import { SanityAssetDocument } from '@sanity/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { categories } from '../utils/constants';

interface Props {
    videoAsset?: SanityAssetDocument;
}

const VideoSubmitForm = (props: Props) => {
    const { videoAsset } = props;

    const [caption, setcaption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(
        categories[0].name
    );
    const [savingPost, setSavingPost] = useState(false);
    const { userProfile }: { userProfile: any } = useAuthStore();
    const router = useRouter();

    const handlePost = async () => {
        if (caption && videoAsset?._id && selectedCategory) {
            setSavingPost(true);

            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id,
                    },
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id,
                },
                category: selectedCategory,
            };
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
                document
            );

            router.push('/');
        }
    };

    return (
        <div className='flex flex-col max-w-[210px] sm:max-w-none pt-8 sm:p-8 justify-center'>
            <label className='text-md font-medium'>Caption</label>
            <input
                type='text'
                value={caption}
                onChange={(e) => setcaption(e.target.value)}
                className='rounded outline-none text-md border-2 border-gray-200 p-2'
            />
            <label className='text-md font-medium'>Choose a Category</label>
            <select
                className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categories.map((category) => (
                    <option
                        key={category.name}
                        className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                        value={category.name}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
            <div className='flex gap-6 mt-10'>
                <button
                    onClick={() => {}}
                    type='button'
                    className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                >
                    Discard
                </button>
                <button
                    onClick={handlePost}
                    type='button'
                    className='bg-red-500 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default VideoSubmitForm;
