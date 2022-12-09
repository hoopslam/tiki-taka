import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { User, VideoPost } from '../../types';
import { useRouter } from 'next/router';
import UserCard from '../../components/UserCard';

interface Props {
    searchResults: {
        videos: VideoPost[];
        searchedAccounts: User[];
    };
}

const Search = ({ searchResults }: Props) => {
    const [accountTab, setAccountTab] = useState(true);
    const router = useRouter();
    const { search } = router.query;
    const { searchedAccounts, videos } = searchResults;

    const accountStyle = accountTab
        ? 'border-b-2 border-black'
        : 'text-gray-400';
    const videoStyle = !accountTab
        ? 'border-b-2 border-black'
        : 'text-gray-400';

    return (
        <div className='w-full '>
            <h2 className=''>{`Search results for "${search}"`}</h2>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                <p
                    className={`text-xl mt-2 font-semibold cursor-pointer ${accountStyle}`}
                    onClick={() => setAccountTab(true)}
                >
                    Accounts
                </p>
                <p
                    className={`text-xl mt-2 font-semibold cursor-pointer ${videoStyle}`}
                    onClick={() => setAccountTab(false)}
                >
                    Videos
                </p>
            </div>
            {accountTab ? (
                searchedAccounts.length ? (
                    searchedAccounts.map((account) => (
                        <UserCard
                            user={account}
                            key={account._id}
                        />
                    ))
                ) : (
                    <NoResults text={`No accounts associated with ${search}`} />
                )
            ) : (
                <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                    {videos.length ? (
                        videos.map((video) => (
                            <VideoCard
                                post={video}
                                key={video._id}
                            />
                        ))
                    ) : (
                        <NoResults text={`No video results for ${search}`} />
                    )}
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = async ({
    params: { search },
}: {
    params: { search: string };
}) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${search}`
    );

    return {
        props: { searchResults: res.data },
    };
};

export default Search;
