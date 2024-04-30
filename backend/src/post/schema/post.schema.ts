import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class FeedPost {
  @Prop()
  username: string;
  @Prop()
  location: string;
  @Prop()
  content: string;
  @Prop()
  profileImageUrl: string;
  @Prop()
  mainImageUrl: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
  likes: Types.ObjectId[]; 
  @Prop({ default: 0 })
  likeCount: number; 
  @Prop()
  commentsArray: Array<string>;
}
export const FeedPostSchema = SchemaFactory.createForClass(FeedPost);
