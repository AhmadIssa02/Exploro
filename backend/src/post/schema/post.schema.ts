import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


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
}
export const FeedPostSchema = SchemaFactory.createForClass(FeedPost);
