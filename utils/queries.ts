export const allPostsQuery = () => {
    const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

    return query;
};

export const postDetailQuery = (postId: string | string[]) => {
    const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        _type,
        userName,
        image,
      }
    }
  }`;
    return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
    const query = `*[_type == "post" && caption match '${searchTerm}*' || category match '${searchTerm}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;
    return query;
};

export const singleUserQuery = (userId: string | string[]) => {
    const query = `*[_type == "user" && _id == '${userId}']`;

    return query;
};

export const userSearchQuery = (searchParam: string | string[]) => {
    const query = `*[_type == "user" && userName match "${searchParam}"]`;
    return query;
};

export const suggestedUsersQuery = () => {
    const query = `*[_type == "user"][0...4]`;

    return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
    const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

    return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
    const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

    return query;
};

export const categoryPostsQuery = (category: string | string[]) => {
    const query = `*[_type == "post" && category match '${category}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

    return query;
};
