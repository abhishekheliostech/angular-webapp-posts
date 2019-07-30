import { Component } from '@angular/core';
import {PostsApiService} from './posts-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'posts-web-app';
  posts: any;

  postsForm: FormGroup;

  constructor(private postsService: PostsApiService, private formBuilder: FormBuilder) {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    this.postsForm = this.formBuilder.group({
      name: [''],
      post: ['']
    });

    this.postsService.getPosts().subscribe(data => {
      console.log('data', data);
      this.posts = data;
    });
  }

  get f() { return this.postsForm.controls; }

  addPost() {
    const body = this.postsForm.value;
    let keyname = 'likes';
    body[keyname] = 0;
    this.postsService.addPost(body).subscribe(() => {
      keyname = 'dateCreated';
      body[keyname] = new Date().getTime();

      this.posts.push(body);
    });
  }

  addLike(postId: any, currentLikes: any) {
    if (currentLikes || currentLikes === 0) {
      const body = {likes: Number(currentLikes) + 1};
      this.postsService.addLikes(postId, body).subscribe((data) => {
        console.log(data);
        this.posts.forEach(element => {
          if (element._id === postId) {
            element.likes = Number(currentLikes) + 1;
          }
      });
      });
    } else {
      const body = {likes: 0};
      this.postsService.addLikes(postId, body).subscribe((data) => {
        console.log(data);
        this.posts.forEach(element => {
          if (element._id === postId) {
            element.likes = Number(0);
          }
      });
      });
    }
  }
}
