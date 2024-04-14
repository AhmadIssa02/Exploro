import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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
}
export const FeedPostSchema = SchemaFactory.createForClass(FeedPost);
