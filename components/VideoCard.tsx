import { NextPage } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { VideoPost } from '../types';

interface Props {
    post: VideoPost;
}

const VideoCard: NextPage<Props> = ({ post }) => {
    const [hover, setHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

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

    return (
        <div className='flex flex-col items-start border-b-2 border-gray-200 pb-6 pl-6'>
            <div className='flex items-center justify-center'>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                    <div className='lg:w-16 lg:h-16 w-10 h-10'>
                        <Link href={`/profile/${post.postedBy._id}`}>
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
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <div className='flex items-center gap-2'>
                                <p className='flex gap-2 items-center sm:text-xl lowercase font-bold text-primary'>
                                    {`${post.postedBy.userName.replaceAll(
                                        ' ',
                                        ''
                                    )} `}
                                    <GoVerified className='text-blue-400 text-md' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden lg:block'>
                                    {post.postedBy.userName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex gap-4'>
                <div
                    className='rounded-3xl relative'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <Link href={`/detail/${post._id}`}>
                        <video
                            ref={videoRef}
                            src={post.video.asset.url}
                            loop
                            className='w-[240px] h-[400px] lg:w-[300px] lg:h-[500px] rounded-2xl cursor-pointer bg-black object-cover'
                        />
                    </Link>
                    {hover && (
                        <div className='absolute bottom-6 flex justify-between px-6 w-full'>
                            {playing ? (
                                <button onClick={onVideoPress}>
                                    <BsFillPauseFill className='text-white text-2xl lg:text-4x1' />
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill className='text-white text-2xl lg:text-4x1' />
                                </button>
                            )}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
