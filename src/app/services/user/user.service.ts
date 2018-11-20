import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) 
  {
      
  }
  get(id: string)
  {
      return this.afs.collection("users").doc(id).snapshotChanges();
  }
}
