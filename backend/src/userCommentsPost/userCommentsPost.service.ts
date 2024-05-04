import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserCommentsPost } from "./schemas/userCommentsPost.schema";
import { Model } from "mongoose";


@Injectable()
export class UserCommentsPostService {
    constructor(@InjectModel(UserCommentsPost.name) private userCommentsPostModel: Model<UserCommentsPost>) {}

    async create(body): Promise<UserCommentsPost> {
        const comment = new this.userCommentsPostModel(body);
        return comment.save();
    }

    async getAllComments(): Promise<UserCommentsPost[]> {
        return this.userCommentsPostModel.find().exec();
    } 

    async getCommentsForPost(postId: string): Promise<UserCommentsPost[]> {
        return this.userCommentsPostModel.find({postId}).exec();
    }
    
    async delete(id: string): Promise<UserCommentsPost> {
        return this.userCommentsPostModel.findByIdAndDelete(id);
    }
}