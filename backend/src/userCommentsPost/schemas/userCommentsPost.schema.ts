import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true,
})
export class UserCommentsPost {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'FeedPost' })
    postId: Types.ObjectId;
    @Prop({ required: false })
    comment: string;
}
export const UserCommentsPostSchema = SchemaFactory.createForClass(UserCommentsPost);