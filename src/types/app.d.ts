export interface IThread {
  id: number;
  content?: string;
  threadId?: number;
  image?: IThreadImage[];
  authorId: number;
  _count: ICountThread;
  likes: ILike[];
  author: IUser;
  createdAt: string;
}

export interface IThreadImage {
  image: string;
}

interface ICountThread {
  likes: number;
  replies: number;
}

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile: IProfile;
  follower: IFollow[];
  following: IFollow[];
  _count: ICountFollowUser;
}

export interface ICountFollowUser {
  following: number;
  follower: number;
}
export interface IProfile {
  id: number;
  avatar?: string;
  bio?: string;
  cover?: string;
}

export interface ILike {
  userId: number;
  threadId: number;
}

export interface IFollow {
  followerId: number;
  followingId: number;
}

export interface IFollows {
  follower?: IUser;
  following?: IUser;
}

export interface Ifollowers {
  follower: {
    id: number;
    fullname: string;
    email: string;
    username: string;
    follower: IFollow[];
    following: IFollow[];
    _count: ICountFollowUser;
    profile: IProfile;
  };
}

export interface Ifollowing {
  following: {
    id: number;
    fullname: string;
    email: string;
    username: string;
    follower: IFollow[];
    following: IFollow[];
    _count: ICountFollowUser;
    profile: IProfile;
  };
}

export interface IAuthLogin {
  username: string;
  password: string;
}

export interface IAuthRegister {
  fullname: string;
  email: string;
  username: string;
  password: string;
}
