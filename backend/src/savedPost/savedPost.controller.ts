import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SavedPost } from './schema/savedPost.schema';
import { SavedPostService } from './savedPost.service';
import { Throttle } from '@nestjs/throttler';

@Controller('saved-posts')
export class SavedPostController {
  constructor(private readonly savedPostService: SavedPostService) {}

  @Get(":id")
//   @UseGuards(AuthGuard())
@Throttle({ default: { limit: 1000000, ttl: 60000 } })
  async getAllUserSavedPosts(@Param('id') body): Promise<SavedPost[]> {
    const userId = body;
    return this.savedPostService.getAllUserSavedPosts(userId);
  }

   @Get()
 //   @UseGuards(AuthGuard())
     async getAllSavedPost(): Promise<SavedPost[]> {
         return this.savedPostService.getAllSavedPosts();
     }

  @Post()
//   @UseGuards(AuthGuard())
  async savePost(@Body() body: { userId:string, postId: string }, ): Promise<SavedPost> {
    return this.savedPostService.savePost(body.userId, body.postId);
  }

  @Delete()
//   @UseGuards(AuthGuard())
  async unsavePost(@Body() body: {userId: string, postId: string}): Promise<void> {
    await this.savedPostService.unsavePost( body.userId, body.postId);
  }
}
