import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: false })
  name: string;
  @Prop({ unique: true, required: false })
  email: string;
  @Prop({ required: false })
  password: string;
  @Prop({ required: false })
  bio?: string;
  @Prop({ required: false })
  profilePicture?: string;
  @Prop()
  verifyEmailToken: string;
  @Prop()
  resetPasswordToken: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'SavedPost' }], default: [] })
  savedPosts: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
