import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendshipController } from "./friendship.controller";
import { FriendshipService } from "./friendship.service";
import { Friendship, FriendshipSchema } from "./schemas/friendship.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friendship.name, schema: FriendshipSchema },
      { name: 'User', schema: UserSchema},
    ])
  ],
  controllers: [FriendshipController],
  providers: [FriendshipService]
})
export class FriendshipModule {}
