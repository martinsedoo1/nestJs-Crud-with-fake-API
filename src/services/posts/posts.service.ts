import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  public getPosts(): Observable<AxiosResponse<any>> {
    const posts: any = this.httpService.get(
      /* NOTE: THIS IS FAKE DATA  FROM  jsonplaceholder*/
      'https://jsonplaceholder.typicode.com/posts',
      /* Headers */
    );
    if (!posts) {
      throw new HttpException('Bad request', 500);
    }
    return posts;
  }
}