import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {Router} from "@angular/router"
import { AuthService } from '../../services/auth/auth.service';

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
    currentUserId: any
    
  constructor(private userService: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
      
      this.id = this.comment.payload.doc.id;
      this.data = this.comment.payload.doc.data(); 
      this.currentUserId = this.auth.uid;
      this.userService.get(this.data.userId).subscribe((user) =>{
          this.user = user.payload.data();
          this.loading = false;
      });
  }
  edit()
  {  
      this.router.navigate(['/comment', this.id]);
  }

}
