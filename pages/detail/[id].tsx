import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { VideoPost } from '../../types';
import useAuthStore from '../../store/authStore';
import Like from '../../components/Like';
import Comments from '../../components/Comments';

interface Params {
    params: {
        id: string;
    };
}

interface Props {
    postDetails: VideoPost;
}

const Detail = ({ postDetails }: Props) => {
    const [post, setPost] = useState(postDetails);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [comment, setComment] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const { userProfile } = useAuthStore();

    if (!post) return null;

    const onVideoPress = () => {
        if (playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play();
            setPlaying(true);
        }
    };

    const onMute = () => {
        if (!videoRef.current) {
            return;
        }
        if (muted) {
            videoRef.current.muted = false;
            videoRef.current.defaultMuted = false;
            setMuted(false);
        } else {
            videoRef.current.muted = true;
            videoRef.current.defaultMuted = true;
            setMuted(true);
        }
    };

    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/like`,
                {
                    userId: userProfile._id,
                    postId: post._id,
                    like,
                }
            );

            setPost({
                ...post,
                likes: data.likes,
            });
        }
    };

    const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userProfile && comment) {
            setIsPostingComment(true);

            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`,
                {
                    userId: userProfile._id,
                    comment,
                }
            );
            setPost({ ...post, comments: data.comments });
            setComment('');
            setIsPostingComment(false);
        }
    };

    return (
        <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap justify-center'>
            <div className='relative flex-2 w-[100px] lg:w-9/12 flex justify-center items-center bg-black'>
                <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                    <p
                        className='cursor-pointer'
                        onClick={() => router.back()}
                    >
                        <MdOutlineCancel className='text-white text-[35px]' />
                    </p>
                </div>
                <div className='relative'>
                    <div className='lg:h-[100vh] h-[60vh]'>
                        <video
                            ref={videoRef}
                            loop
                            onClick={onVideoPress}
                            src={post.video.asset.url}
                            className='h-full cursor-pointer'
                        ></video>
                    </div>
                    <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer'>
                        {!playing && (
                            <button onClick={onVideoPress}>
                                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                            </button>
                        )}
                    </div>
                </div>
                <div className='absolute bottom-5 lg-bottom-10 right-5 lg:right-10 cursor-pointer'>
                    {muted ? (
                        <button onClick={onMute}>
                            <HiVolumeOff className='text-white text-2xl lg:text-4x1' />
                        </button>
                    ) : (
                        <button onClick={onMute}>
                            <HiVolumeUp className='text-white text-2xl lg:text-4x1' />
                        </button>
                    )}
                </div>
            </div>
            <div className='relative w-[100px] md:w-[900px] lg:w-[700px]'>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded mt-4'>
                    <div className='ml-4 lg:w-20 lg:h-20 w-16 h-16'>
                        <Link href='/'>
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    src={post.postedBy.image}
                                    alt='profile avatar'
                                    layout='responsive'
                                    className='rounded-full'
                                />
                            </>
                        </Link>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Link href='/'>
                            <div className='flex flex-col gap-2'>
                                <p className='flex gap-2 items-center sm:text-xl font-bold text-primary'>
                                    {`${post.postedBy.userName} `}
                                    <GoVerified className='text-blue-400 text-md' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden lg:block'>
                                    {post.postedBy.userName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <p className='px-10 text-lg text-gray-600'>{post.caption}</p>
                {userProfile && (
                    <Like
                        likes={post.likes}
                        handleLike={() => handleLike(true)}
                        handleDislike={() => handleLike(false)}
                    />
                )}
                <Comments
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                    comments={post.comments}
                    isPostingComment={isPostingComment}
                />
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ params: { id } }: Params) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`
    );

    return {
        props: { postDetails: data },
    };
};

export default Detail;
