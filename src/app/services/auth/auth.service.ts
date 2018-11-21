import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User { 
    email: string;
    firstname: string;
    lastname: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user: User = null;
    uid: string = null;
    email: string = null;
    
    registering: boolean = false;
    
    authState;

    constructor(public FBauth: AngularFireAuth, private afs: AngularFirestore) {
        this.authState = this.FBauth.authState;
        this.authState.subscribe((response) => {
            if(response && response.uid){
                this.uid = response.uid;
                this.email = response.email;
                this.afs.collection('users').doc(response.uid).snapshotChanges().subscribe((user) => {
                    this.user = <User>user.payload.data();
                });
            }else {
                this.uid = null;
                this.email = null;
                this.user = null;
            }
        });
    }
    
    register(email: string, password: string){
        this.registering = true;
        console.log("Email", email, "password", password);
        this.FBauth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password).then((userCredentials) => {
            this.uid = userCredentials.user.uid;
            this.email = email;
            this.FBauth.auth.signOut();
        });
    }
    
    assignInfo(firstname: string, lastname: string)
    {
        this.registering = false;
        return new Promise((resolve, reject) =>{
            // Set Local User Object
            let user = {} as User;
            user.email = this.email;
            user.firstname = firstname;
            user.lastname = lastname;
            this.user = user;
            
            console.log(this.uid);            
            //Publish to firebase
            let users = this.afs.collection<User>('users');
            users.doc(this.uid).set(user);
            resolve();
        });
    }
    
    login(email: string, password: string)
    {
        return new Promise((resolve, reject) => {
            this.FBauth.auth.signInWithEmailAndPassword(email, password).then((userObj) => {
                // this.user = userObj;
                let doc = this.afs.collection<User>('users').doc(userObj.user.uid);
                doc.ref.get().then((document) => {
                    let data = document.data();
                    
                    this.uid = userObj.user.uid;
                    
                    let user = {} as User;
                    user.email = data.email;
                    user.firstname = data.firstname;
                    user.lastname = data.lastname;
                    
                    this.user = user;
                
                    resolve(this.user);
                });
            }).catch((error) => {
                reject(error);
            });
        })
    }
    
    logout()
    {
        this.FBauth.auth.signOut();
    }
}
