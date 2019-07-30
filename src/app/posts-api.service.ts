import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(environment.postsApiEndpoint + '/posts');
  }

  addPost(body) {
    return this.http.post(environment.postsApiEndpoint + '/posts/create', body, {responseType: 'text'});
  }

  addLikes(id, body) {
    return this.http.put(environment.postsApiEndpoint + '/posts/' + id + '/update', body, {responseType: 'text'});
  }
}
