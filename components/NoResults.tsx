import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';
import { CommentType } from './Comments';

interface Props {
    text: string;
}

const NoResults = ({ text }: Props) => {
    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <p className='text-8xl'>
                {text === CommentType.NO_COMMENT ? (
                    <BiCommentX />
                ) : (
                    <MdOutlineVideocamOff />
                )}
            </p>
            <p className='text-2xl text-center'>{text}</p>
        </div>
    );
};

export default NoResults;
