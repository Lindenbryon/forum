import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../../services/comments/comments.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
    @Input() 
    postId : string;
    uid: string = null;
    body: string = null;
    
  constructor(private commentsService: CommentsService, private auth: AuthService) { }

  ngOnInit() {
      this.uid = this.auth.uid;
  }
  add(){
      this.commentsService.add(this.uid, this.postId, this.body).then(() => {
          this.body = null;
      });
  }

}
