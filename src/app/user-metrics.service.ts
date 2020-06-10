import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { User } from './user';
import {Plugins} from '@capacitor/core';
const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserMetricsService {
  // users: Observable<DocumentChangeAction<User>[]>;
  userdocs: any;
  users: any;
  jobdocs: any;
  jobs: any;
  currentUser:User;
  usersCollectionRef: AngularFirestoreCollection<User>;
  jobsCollectionRef: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) { 
    this.usersCollectionRef = this.afs.collection('users');
    // this.jobsCollectionRef = this.afs.collection('jobs');
    // console.log(this.jobsCollectionRef);
    this.userdocs = this.usersCollectionRef.valueChanges({idField:"docid"});
    // this.jobdocs = this.jobsCollectionRef.valueChanges();
    // console.log(this.jobdocs);
    // this.jobdocs.subscribe(jobdoc => {
    //   this.jobs = jobdoc;
    //   console.log(this.jobs[0]);
    // });
    this.userdocs.subscribe(userdoc=>{
      this.users = userdoc;
      
    });
  }
  async ngOnInit() {
    const { value } = await Storage.get({ key: "user" });
    if (value) {
      this.currentUser = JSON.parse(value);
    }
  }

  // getJobs(){
  //   return this.jobs[0].jobs;
  // }

  getUser(){
    return this.currentUser;
  }

  async updateUser(user:User){
    await Storage.set({key: 'user', value: JSON.stringify(user)});
    console.log('Updated storage');
    const update_user = this.users.find(userdoc => userdoc.id == user.id);
    await this.usersCollectionRef.doc(update_user.docid).update(user);
    console.log('Updated Firebase');
  }


}
