import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true,
})
export class UserLikesPost {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'FeedPost' })
    postId: Types.ObjectId;
}
export const UserLikesPostSchema = SchemaFactory.createForClass(UserLikesPost);