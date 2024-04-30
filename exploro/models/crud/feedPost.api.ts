
export interface feedPost {
    _id: string;
    username: string;
    location: string;
    content: string;
    profileImageUrl: string;
    mainImageUrl: string;
    user: string;
    likeCount: number;
    likes: string[];
    createdAt: Date;
    updateAt: Date;
  }
export interface feedPostRequest {
    username: string;
    location: string;
    content: string;
    profileImageUrl: string;
    mainImageUrl: string;
    user: string;
  }

  
  
  