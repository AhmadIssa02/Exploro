import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { Friendship } from './schemas/friendship.schema';

@Controller('friendship')
export class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

    @Post()
    async createFriendship(@Body() friendshipData: { user1Id: string, user2Id: string }): Promise<Friendship> {
        const { user1Id, user2Id } = friendshipData;
        return this.friendshipService.createFriendship(user1Id, user2Id);
    }

    @Get()
    async getFriendships(): Promise<Friendship[]> {
        return this.friendshipService.getFriendships();
    }

    @Delete()
    async deleteFriendship(@Body() friendshipData: { user1Id: string, user2Id: string }): Promise<void> {
        const { user1Id, user2Id } = friendshipData;
        return this.friendshipService.deleteFriendship(user1Id, user2Id);
    }
    
    // @Get('user/:userId')
    // async getFriendshipsOfUser(@Body() userId: string): Promise<Friendship[]> {
    //     return this.friendshipService.getFriendshipsOfUser(userId);
    // }
}
