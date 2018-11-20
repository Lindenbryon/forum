import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    loading: boolean = false;
    posts: Observable<any[]>;

  constructor(private postsService: PostsService) 
  {
      this.loading = true;
      this.posts = postsService.get();
      this.loading = false;
  }

  ngOnInit() {
  }

}
