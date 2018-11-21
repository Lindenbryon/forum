import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Comment
{
    userId: string;
    postId: string;
    body: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private afs: AngularFirestore) {
      
  }
  get(id: string){
      return this.afs.collection("comments", ref => ref.where("postId", "==", id)).snapshotChanges();
  }
  getComment(id: string){
      return this.afs.collection("comments").doc(id).snapshotChanges();
  }
  
  add(uid : string, postId: string, body: string)
  {
      return new Promise((resolve, reject) => {
          let comment = {} as Comment;
          comment.userId = uid;
          comment.postId = postId;
          comment.body = body;
          console.log(comment);
           this.afs.collection("comments").add(comment);
           resolve();
      });
      
  }
  edit(id: string, body: string){
      return new Promise((resolve, reject) => {
          this.afs.collection("comments").doc(id).update({ body: body });
          resolve();
      });
  }
}
