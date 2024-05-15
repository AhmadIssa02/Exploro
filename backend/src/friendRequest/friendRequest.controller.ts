import { Controller, Post, Put, Body, Get } from '@nestjs/common';
import { FriendRequestService } from './friendRequest.service';
import { FriendRequest } from './schemas/friendRequest.schema';
import { Throttle } from '@nestjs/throttler';

@Controller('friend-request')
export class FriendRequestsController {
    constructor(private friendRequestService: FriendRequestService) {}

    @Post('send-friend-request')
    async sendFriendRequest(@Body() request: { senderId: string, receiverId: string }): Promise<FriendRequest> {
        const { senderId, receiverId } = request;
        return this.friendRequestService.sendFriendRequest(senderId, receiverId);
    }

    @Put('accept')
    async acceptFriendRequest(@Body() request: { requestId: string }): Promise<void> {
        const { requestId } = request;
        return this.friendRequestService.acceptFriendRequest(requestId);
    }

    @Put('reject')
    async rejectFriendRequest(@Body() request: { requestId: string }): Promise<void> {
        const { requestId } = request;
        return this.friendRequestService.rejectFriendRequest(requestId);
    }

    @Get()
    @Throttle({ default: { limit: 1000000, ttl: 60000 } })
        async getFriendRequests(): Promise<FriendRequest[]> {
            return this.friendRequestService.getFriendRequests();
        }
        
    @Post('exists')
        async checkFriendRequest(@Body() body: { senderId: string, receiverId: string }): Promise<{ exists: boolean }> {
          const exists = await this.friendRequestService.friendRequestExists(body.senderId, body.receiverId);
          return { exists };
        }
}
