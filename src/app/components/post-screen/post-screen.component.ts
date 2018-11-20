import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
  selector: 'app-post-screen',
  templateUrl: './post-screen.component.html',
  styleUrls: ['./post-screen.component.css']
})
export class PostScreenComponent implements OnInit {
    newPost: FormGroup;
    loading: boolean = false;
    id: any;
    createMode: boolean = false;
    post: any;
    comments: any;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private postService: PostService, private commentsService: CommentsService) 
  {}
  
  private setMode(mode : boolean){
      this.createMode = mode;
  }
  
  ngOnInit() {
      this.newPost = this._formBuilder.group({
        subject: ['', Validators.required],
        body: ['', Validators.required]
      });
      this.route.paramMap.subscribe(params =>{
          this.id = params.get('id');
          if(this.id == "create")
          {
              this.setMode(true);
              //Set a new post
              this.post = {};
          }
          else
          {
              this.loading = true;
              this.setMode(false);
              //Load the Post
              this.postService.get(this.id).subscribe((document) => {
                  this.post = document;
              });
              this.commentsService.get(this.id).subscribe((comments) => {
                  this.comments = comments;
                  console.log(comments);
                  this.loading = false;
              });
              
          }
      })
  }

  create()
  {
      let subject = this.newPost.controls.subject.value;
      let body = this.newPost.controls.body.value;
      if(subject !== "" && body !== ""){
          this.postService.create(subject, body).then((id) => {
              //Navigate to the post.
              this.router.navigate([ '/post', id ]);
          });
      }
  }

}