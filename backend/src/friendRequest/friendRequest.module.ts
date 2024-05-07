import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendRequestSchema } from "./schemas/friendRequest.schema";
import { FriendRequestsController } from "./friendRequest.controller";
import { FriendRequestService } from "./friendRequest.service";
import { UserSchema } from "src/users/schemas/user.schema";
import { FriendshipSchema } from "src/friendship/schemas/friendship.schema";

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'FriendRequest', schema: FriendRequestSchema},
        { name: 'User', schema: UserSchema},
        { name: 'Friendship', schema: FriendshipSchema},
      ])],
    controllers: [FriendRequestsController],
    providers: [FriendRequestService]
  })
  export class FriendRequestModule {}
  