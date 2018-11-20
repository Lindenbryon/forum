import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    id: any;
    @Input() post: any;
    
    data: any;

  constructor(private router: Router) { }

  ngOnInit() {
      this.id = this.post.payload.doc.id;
      this.data = this.post.payload.doc.data(); 
  }
  
  go()
  {
      this.router.navigate(['/post', this.id]);
  }

}
