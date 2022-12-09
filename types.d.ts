export interface VideoPost {
    caption: string;
    video: {
        asset: {
            _id: string;
            url: string;
        };
    };
    _id: string;
    postedBy: User;
    likes: {
        postedBy: {
            _id: string;
            userName: string;
            image: string;
        };
    }[];
    comments: {
        comment: string;
        _key: string;
        postedBy: User;
    }[];
    userId: string;
}

export interface User {
    _id: string;
    _type: string;
    userName: string;
    image: string;
}
