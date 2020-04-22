import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  messages: AngularFirestoreCollection<any>;
  bugs: AngularFirestoreCollection<any>;
  features: AngularFirestoreCollection<any>;
  feedbacks: AngularFirestoreCollection<any>;

  constructor(
    private fire: AngularFirestore
  ) { 
    this.messages = fire.collection('message');
    this.bugs = fire.collection('bugs');
    this.features = fire.collection('features');
    this.feedbacks = fire.collection('feedbacks');
  }

  submitMessage(form: any) {
    const date = new Date();
    const timestamp = date.getTime();
    return this.messages.add({ ...form, timestamp });
  }
  
  submitBugs(form: any) {
    const date = new Date();
    const timestamp = date.getTime();
    return this.bugs.add({ ...form, timestamp });
  }
  
  submitFeature(form: any) {
    const date = new Date();
    const timestamp = date.getTime();
    return this.features.add({ ...form, timestamp });
  }

  submitFeedback(form: any) {
    const date = new Date();
    const timestamp = date.getTime();
    return this.feedbacks.add({ ...form, timestamp });
  }

}
