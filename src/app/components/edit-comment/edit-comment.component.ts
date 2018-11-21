import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { CommentsService } from '../../services/comments/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
    id: any;
    comment: any;
    body: string = null;
    loading: boolean = true;
    
  constructor(private router: Router, private route: ActivatedRoute, private commentService: CommentsService) 
  {
      
  }

  ngOnInit() 
  {
      this.route.paramMap.subscribe((params) =>{
          this.id = params.get('id');
          this.commentService.getComment(this.id).subscribe((comment) => {
              this.comment = comment.payload.data();
              this.body = this.comment.body;
              this.loading = false;
          });
      });
  }
  editComment(){
      this.commentService.edit(this.id, this.body).then(() => {
         this.router.navigate(['/post', this.comment.postId]); 
      });
  }

}
