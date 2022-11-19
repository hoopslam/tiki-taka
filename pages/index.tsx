import type { NextPage } from 'next';
import axios from 'axios';
import { VideoPost } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

interface Props {
    videos: VideoPost[];
}

const Home: NextPage<Props> = ({ videos }) => {
    return (
        <div className='flex flex-col gap-10 videos h-full'>
            {videos.length ? (
                videos.map((video) => (
                    <VideoCard
                        post={video}
                        key={video._id}
                    />
                ))
            ) : (
                <NoResults text={'No videos'} />
            )}
        </div>
    );
};

export const getServerSideProps = async () => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`
    );

    return {
        props: {
            videos: data,
        },
    };
};

export default Home;
