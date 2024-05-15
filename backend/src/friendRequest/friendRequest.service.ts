import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendRequest } from './schemas/friendRequest.schema';
import { User } from '../users/schemas/user.schema';
import { Friendship } from 'src/friendship/schemas/friendship.schema';

@Injectable()
export class FriendRequestService {
    constructor(
        @InjectModel('FriendRequest') private friendRequestModel: Model<FriendRequest>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel('Friendship') private friendshipModel: Model<Friendship>
    ) {}

    async sendFriendRequest(senderId: string, receiverId: string): Promise<FriendRequest> {
        
        if(await this.friendRequestModel.findOne({sender: senderId, receiver: receiverId})) {
            throw new Error("You have already sent a friend request to this user");
        }

        if(await this.friendRequestModel.findOne({sender: receiverId, receiver: senderId})) {
            throw new Error("This user has already sent you a friend request");
        }
        if(await this.friendshipModel.findOne({user1: senderId, user2: receiverId})) {
            throw new Error("You are already friends with this user");
        }
        if(await this.friendshipModel.findOne({user1: receiverId, user2: senderId})) {
            throw new Error("You are already friends with this user");
        }
        // Create a friend request
        const friendRequest = new this.friendRequestModel({ sender: senderId, receiver: receiverId });
        await friendRequest.save();

        // Update receiver's receivedFriendRequests
        await this.userModel.findByIdAndUpdate(receiverId, { $push: { receivedFriendRequests: friendRequest._id } });

        return friendRequest;
    }

    async acceptFriendRequest(requestId: string): Promise<void> {
        // Find the friend request
        const friendRequest = await this.friendRequestModel.findById(requestId);

        // Update sender's friends
        await this.userModel.findByIdAndUpdate(friendRequest.sender, { $push: { friends: friendRequest.receiver } });

        // Update receiver's friends
        await this.userModel.findByIdAndUpdate(friendRequest.receiver, { $push: { friends: friendRequest.sender } });

        // Create a new friendship
        const friendship = new this.friendshipModel({ user1: friendRequest.sender, user2: friendRequest.receiver });
        await friendship.save();

        // Delete the friend request
        await this.friendRequestModel.findByIdAndDelete(requestId);

        // Remove the sender from the receiver's receivedFriendRequests
        await this.userModel.findByIdAndUpdate(friendRequest.receiver, { $pull: { receivedFriendRequests: friendRequest._id } });
    }

    async rejectFriendRequest(requestId: string): Promise<void> {
        const friendRequest = await this.friendRequestModel.findById(requestId);

        // Remove the sender from the receiver's receivedFriendRequests
        await this.userModel.findByIdAndUpdate(friendRequest.receiver, { $pull: { receivedFriendRequests: friendRequest._id } });
        // Delete the friend request
        await this.friendRequestModel.findByIdAndDelete(requestId);
    }


    async getFriendRequests(): Promise<FriendRequest[]> {
        return this.friendRequestModel.find();
    }

    async friendRequestExists(senderId: string, receiverId: string): Promise<boolean> {
        const friendRequest = await this.friendRequestModel.findOne({
        $or: [
            { sender: senderId, receiver: receiverId },
            { sender: receiverId, receiver: senderId }
        ],
        status: 'pending' 
        });
        if(friendRequest) {
            return true;
        }
        else {
            return false;
        }
    }
  

}
