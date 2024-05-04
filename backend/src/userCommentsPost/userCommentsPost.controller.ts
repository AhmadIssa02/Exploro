import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserCommentsPost } from "./schemas/userCommentsPost.schema";
import { UserCommentsPostService } from "./userCommentsPost.service";


@Controller('userCommentsPost')
export class UserCommentsPostController {
  constructor(private userCommentsPostService: UserCommentsPostService ) {}

    @Get()
    async getAllComments(): Promise<UserCommentsPost[]> {
        return this.userCommentsPostService.getAllComments();
    }   
    
    @Get(':postId/comments')
    async getCommentsForPost(@Param('postId') postId: string): Promise<UserCommentsPost[]> {
        return this.userCommentsPostService.getCommentsForPost(postId);
    }
    @Post()
    create(@Body() body:{userId:string, postId:string, comment:string}): Promise<UserCommentsPost> {
        console.log(body)
        return this.userCommentsPostService.create(body);
    }
    @Delete(':id')
    delete(@Param('id') id: string): Promise<UserCommentsPost> {
        return this.userCommentsPostService.delete(id);
    }
}