import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PostInterface } from '../Post.interface';

// import { PostService } from '../post/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private fs: AngularFirestore) { 
      
  }
  
  get()
  {
      return this.fs.collection('posts').snapshotChanges();
  }
  
  create()
  {
  }
}
