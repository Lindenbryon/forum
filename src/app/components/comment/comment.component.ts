import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    
    @Input() comment : any;
    loading: boolean = true;
    id: string;
    data: any;
    user: any;
    
  constructor(private userService: UserService) { }

  ngOnInit() {
      this.id = this.comment.payload.doc.id;
      this.data = this.comment.payload.doc.data(); 
      this.userService.get(this.data.userId).subscribe((user) =>{
          this.user = user.payload.data();
          this.loading = false;
      });
  }

}
