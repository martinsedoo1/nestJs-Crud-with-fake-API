import { Controller, Res, Get } from '@nestjs/common';
import { PostsService } from 'services/posts/posts.service';
import { Subject, Observable } from 'rxjs';

@Controller()
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('posts')
  public  posts(): Observable<any> {
  const posts: Subject<object> = new Subject<object>();
  this.postsService.getPosts().subscribe((post: any) => {
    posts.next(post.data);
    posts.complete();
  });
  return  posts.asObservable();
  }
}
