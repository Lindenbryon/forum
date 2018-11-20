import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private fs: AngularFirestore) { }
  
  get(id: string)
  {
      return this.fs.collection('posts').doc(id).valueChanges();
  }
  
  create(subject: string, body: string)
  {
      //Create new Post
      return new Promise((resolve, reject) => {
          this.fs.collection('posts').add({ subject: subject, body: body }).then((newPost) => {
              resolve(newPost.id);
          });
      });
  }
  
}
