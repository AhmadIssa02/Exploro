import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Friendship extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user1: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user2: Types.ObjectId; 
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
