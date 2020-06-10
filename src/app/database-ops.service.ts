import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { User } from './user';

// interface User {
//   name: string,  
//   email: string,
//   imageUrl: string,
//   id: string,
//   familyName: string,
//   givenName: string
// }



@Injectable({
  providedIn: 'root'
})

export class DatabaseOpsService {
  users: Observable<User[]>;
  usersCollectionRef: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) { 
    this.usersCollectionRef = this.afs.collection('users');
    this.users = this.usersCollectionRef.valueChanges();
  }

  getUsers(){
    return this.users;
  }

  async addUser(user: User){
    const res = await this.usersCollectionRef.add(user);
    console.log(res);
    return "Added";
  }

  async updateUser(user:User){
    
  }
}
