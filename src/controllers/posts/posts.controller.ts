import { Controller, Get, Put, Body, Param, Post, Delete } from '@nestjs/common';
import { PostsService } from 'services/posts/posts.service';
import { Subject, Observable, from } from 'rxjs';

@Controller()
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('posts')
  /* I used any in Observable cuz I don't have a Model */
  private getPosts(): Observable<any /* Model guess here */> {
    const posts: Subject<object> = new Subject<object>();
    this.postsService.getPosts().subscribe((post: any) => {
      posts.next(post.data);
      posts.complete();
    });
    return posts.asObservable();
  }

  @Put('posts/:id')
  private updatePost(@Param() params, @Body() body): Observable<any> {
    const updatedPost: Subject<any> = new Subject<any>();
    this.postsService
      .updatePost(params.id, body.title, body.body)
      .subscribe((postUpdated: any) => {
        updatedPost.next(postUpdated.data);
        updatedPost.complete();
      });

    return updatedPost.asObservable();
  }

  @Post('posts/:userId')
  private createPost(@Param() params , @Body() body): Observable<any> {
    const createdPost: Subject<any> =  new  Subject<any>();
    this.postsService.createPost(params.userId, body.title, body.body)
    .subscribe((postCreated: any) => {
      createdPost.next(postCreated.data);
      createdPost.complete();
    });
    return createdPost.asObservable();
  }

  @Delete('posts/:id')
  private deletePost(@Param() params): Observable<any> {
    const deletedPost: Subject<any> = new Subject<any>();
    this.postsService.deletePost(params.id).subscribe((postDeleted: any ) => {
      deletedPost.next(postDeleted.data);
      deletedPost.complete();
    });
    return from(deletedPost);
  }
}
