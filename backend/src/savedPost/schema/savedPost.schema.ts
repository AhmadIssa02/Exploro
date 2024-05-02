import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class SavedPost {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'FeedPost' })
    postId: Types.ObjectId;
}
export const SavedPostSchema = SchemaFactory.createForClass(SavedPost);

