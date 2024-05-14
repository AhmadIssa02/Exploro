import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserLikesPost } from "./schemas/userLikesPost.schema";
import { UserLikesPostService } from "./userLikesPost.service";


@Controller('userLikesPost')
export class UserLikesPostController {
  constructor(private userLikesPostService: UserLikesPostService ) {}

    @Get()
    async getAllLikes(): Promise<UserLikesPost[]> {
        return this.userLikesPostService.getAllLikes();
    }   
    
    @Post()
    create(@Body() body:{userId:string, postId:string}): Promise<UserLikesPost> {
        return this.userLikesPostService.create(body);
    }

    @Delete()
    delete(@Body() body:{userId:string, postId:string}): Promise<UserLikesPost> {
        return this.userLikesPostService.delete(body);
    }
}