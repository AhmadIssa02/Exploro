import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserLikesPost } from "./schemas/userLikesPost.schema";
import { Model } from "mongoose";
import { PostService } from "src/post/post.service";
import { UsersService } from "src/users/users.service";
import { error } from "console";

@Injectable()
export class UserLikesPostService {
    constructor(
        @InjectModel(UserLikesPost.name) 
        private userLikesPostModel: Model<UserLikesPost>,
        private postService: PostService,
        private usersService: UsersService

            
    ) {}

    async create(body): Promise<UserLikesPost> {
        const post = await this.postService.findById(body.postId);
        if(!post){
            console.log('Post not found');
            return null;
        }
        if(!await this.usersService.findOne(body.userId)){
            throw new Error('User not found');
        }
        if (await this.userLikesPostModel.findOne({userId: body.userId, postId: body.postId})) {
            throw new Error('User already liked this post');
        }
        else {
            this.postService.likePost(body.userId, body.postId);
            const like = new this.userLikesPostModel(body);
            return like.save();
        }
    }

    async getAllLikes(): Promise<UserLikesPost[]> {
        return this.userLikesPostModel.find().exec();
    } 
    
    async delete(body): Promise<UserLikesPost> {
        // First, find the like using the correct query
        const like = await this.userLikesPostModel.findOne({
            userId: body.userId,
            postId: body.postId
        });
    
        if (!like) {
            throw new Error('Like not found');
        }
    
        // Correctly delete the like entry using the found like's _id
        await this.userLikesPostModel.findByIdAndDelete(like._id);
    
        // Convert ObjectId to string before passing to unlikePost
        await this.postService.unlikePost(like.userId.toString(), like.postId.toString());
    
        return like;
    }
}