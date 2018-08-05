import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  public getPosts(): Observable<AxiosResponse<any>> {
    const getPosts: any = this.httpService.get(
      /* NOTE: THIS IS FAKE DATA FROM  jsonplaceholder*/
      'https://jsonplaceholder.typicode.com/posts',
      /* Headers */
    );
    if (!getPosts) {
      throw new HttpException('Bad request', 500);
    }
    return getPosts;
  }

  public updatePost(
    id: string,
    theTitle: string,
    theBody: string,
  ): Observable<any> {
    const updatedPosts: any = this.httpService.put(
      /* NOTE: THIS IS FAKE DATA FROM  jsonplaceholder*/
      'https://jsonplaceholder.typicode.com/posts/' + id,
      {
        title: theTitle,
        body: theBody,
      },
      /* Headers */
    );
    if (!updatedPosts) {
      throw new HttpException('Bad request', 500);
    }
    return updatedPosts;
  }

  public createPost(
    TheUserId: string,
    theTitle: string,
    theBody: string,
  ): Observable<AxiosResponse<any>> {
    return this.httpService.post<any>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: theTitle,
        body: theBody,
        userId: TheUserId,
      },
      { headers: { 'Content-type': 'application/json; charset=UTF-8' } },
    );
  }
public deletePost(id: string): Observable<any> {
  return this.httpService.delete('https://jsonplaceholder.typicode.com/posts/' + 1 );
}
}
