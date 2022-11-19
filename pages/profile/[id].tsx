import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { User, VideoPost } from '../../types';

interface Props {
    data: {
        user: User;
        userVideos: VideoPost[];
        userLikedVideos: VideoPost[];
    };
}

const Profile = ({ data }: Props) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<VideoPost[]>([]);

    const { user, userVideos, userLikedVideos } = data;

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        if (showUserVideos) {
            setVideosList(userVideos);
        } else {
            setVideosList(userLikedVideos);
        }
    }, [showUserVideos, userLikedVideos, userVideos]);

    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white flex-col'>
                <div className='w-16 h-16 md:w-24 md:h-24'>
                    <Image
                        src={user.image}
                        width={24}
                        height={24}
                        className='rounded-full'
                        alt='user profile'
                        layout='responsive'
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase'>
                        {user.userName.replaceAll(' ', '')}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize md:text-l text-gray-400 text-xs'>
                        {user.userName}
                    </p>
                </div>
            </div>
            <div>
                <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                    <p
                        className={`text-xl mt-2 font-semibold cursor-pointer ${videos}`}
                        onClick={() => setShowUserVideos(true)}
                    >
                        Videos
                    </p>
                    <p
                        className={`text-xl mt-2 font-semibold cursor-pointer ${liked}`}
                        onClick={() => setShowUserVideos(false)}
                    >
                        Liked
                    </p>
                </div>
                <div className='flex gap-6 flex-wrap md:justify-start'>
                    {videosList.length > 0 ? (
                        videosList.map((post) => (
                            <VideoCard
                                post={post}
                                key={post._id}
                            />
                        ))
                    ) : (
                        <NoResults
                            text={`No ${
                                showUserVideos ? `` : `Liked`
                            } Videos Yet`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`
    );

    return {
        props: { data: res.data },
    };
};

export default Profile;
