import { Component } from '@angular/core';
import {PostsApiService} from './posts-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'posts-web-app';
  posts: any;

  postsForm: FormGroup;

  constructor(private postsService: PostsApiService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.getPost();
  }

  get f() { return this.postsForm.controls; }

  addPost() {
    const body = this.postsForm.value;
    const keyname = 'likes';
    body[keyname] = 0;
    this.postsService.addPost(body).subscribe(() => {
      this.getPost();
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

  getPost() {
    this.spinner.show();
    this.postsForm = this.formBuilder.group({
      name: [''],
      post: ['']
    });

    this.postsService.getPosts().subscribe(data => {
      console.log('data', data);
      this.posts = data;
      this.spinner.hide();
    });
  }
}
