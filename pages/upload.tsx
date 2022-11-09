import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { categories } from '../utils/constants';
import VideoSubmitForm from '../components/VideoSubmitForm';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import Spinner from '../components/Spinner';

const upload = () => {
    const [loading, setLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<
        SanityAssetDocument | undefined
    >();
    const [wrongFileType, setWrongFileType] = useState(false);

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        if (fileTypes.includes(selectedFile.type)) {
            setLoading(true);
            try {
                client.assets
                    .upload('file', selectedFile, {
                        contentType: selectedFile.type,
                        filename: selectedFile.name,
                    })
                    .then((data) => {
                        setVideoAsset(data);
                        setLoading(false);
                    });
            } catch (err) {
                console.error(err);
            }
        } else {
            setLoading(false);
            setWrongFileType(true);
        }
    };

    return (
        <div className='flex flex-col h-full mt-8 items-center'>
            <div className='text-center'>
                <p className='text-2xl font-bold p-2 text-red-500'>
                    Share with the world!
                </p>
                <p className='text-md text-gray-400'>
                    Post a video to your account
                </p>
            </div>
            <div className='flex flex-col items-center'>
                <div className='flex-col'>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[210px] h-[300px] p-10 cursor-pointer hover:border-red-300 hover;bg-gray-100'>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video
                                            src={videoAsset.url}
                                            loop
                                            controls
                                            className='rounded-xl h-[450px] mt-16 bg-black'
                                        ></video>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p className='font-bold text-xl'>
                                                    <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                                </p>
                                                <p>Upload Video</p>
                                            </div>
                                            <div className='text-gray-400 text-center mt-5 text-sm leading-5'>
                                                <p>MP4 or WebM or ogg </p>
                                                <p>720x1280 or higher</p>
                                                <p>Up to 1 minute</p>
                                                <p>Less than 500mb</p>
                                                <p className='bg-red-500 text-center m-4 p-2 rounded text-white text-md font-medium w-40 outline-none'>
                                                    Select File
                                                </p>
                                                <input
                                                    type='file'
                                                    name='upload-video'
                                                    onChange={uploadVideo}
                                                    className='w-0 h-0'
                                                />
                                            </div>
                                        </div>
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType && (
                            <p className='text-center text-xl text-red-500 font-semibold mt-4 w-[250px]'>
                                This file type is not supported
                            </p>
                        )}
                    </div>
                </div>
                <VideoSubmitForm videoAsset={videoAsset} />
            </div>
        </div>
    );
};

export default upload;
