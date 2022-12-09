import React, { Dispatch, SetStateAction } from 'react';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { User } from '../types';
import UserCard from './UserCard';

export enum CommentType {
    NO_COMMENT = 'No Comments Yet!',
    FIRST = 'Be the first to comment!',
    ADD_COMMENT = 'Add comment...',
}
interface Props {
    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: Comment[];
}

interface Comment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: User;
}

const Comments = ({
    isPostingComment,
    comment,
    setComment,
    addComment,
    comments,
}: Props) => {
    const { userProfile } = useAuthStore();
    console.log(comments);

    return (
        <div className='border-t-2 border-gray-200 pt-4 px-10 border-b-2 lg:pb-0 pb-[100px]'>
            {userProfile ? (
                <div className='pb-6'>
                    <form
                        onSubmit={addComment}
                        className='flex gap-4'
                    >
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={CommentType.ADD_COMMENT}
                            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
                        ></input>
                        <button
                            className='text-md text-gray-400'
                            onClick={addComment}
                        >
                            {isPostingComment ? 'Commenting...' : 'Comment'}
                        </button>
                    </form>
                </div>
            ) : (
                <div>Please sign in to comment</div>
            )}
            <div className='overflow-scroll max-h-[50vh] min-h-[350px] bg-[#f8f8f8] p-5 rounded-lg'>
                {comments.length ? (
                    comments.map((item) => (
                        <div
                            key={item._key}
                            className='flex'
                        >
                            {item.postedBy && (
                                <UserCard
                                    user={item.postedBy}
                                    key={item._key}
                                />
                            )}
                            <p>{item.comment}</p>
                        </div>
                    ))
                ) : (
                    <NoResults text={CommentType.NO_COMMENT} />
                )}
            </div>
        </div>
    );
};

export default Comments;
