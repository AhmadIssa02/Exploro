import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friendship } from './schemas/friendship.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectModel('Friendship') private friendshipModel: Model<Friendship>,
    @InjectModel(User.name) private userModel: Model<User>,
) {}

  async createFriendship(user1Id: string, user2Id: string): Promise<Friendship> {
    const friendship = new this.friendshipModel({ user1: user1Id, user2: user2Id });
    return friendship.save();
  }

  async getFriendships(): Promise<Friendship[]> {
    return this.friendshipModel.find();
  }

  async deleteFriendship(user1Id: string, user2Id: string): Promise<void> {
    await this.friendshipModel.findOneAndDelete({
      $or: [
        { user1: user1Id, user2: user2Id },
        { user1: user2Id, user2: user1Id }
      ]
    });
    await this.userModel.findByIdAndUpdate(user1Id, { $pull: { friends: user2Id } });
    await this.userModel.findByIdAndUpdate(user2Id, { $pull: { friends: user1Id } });
  }

//   async getFriendshipsOfUser(userId: string): Promise<Friendship[]> {
//     return this.friendshipModel.find({ $or: [{ user1: userId }, { user2: userId }] });
//   }
}
