import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  messages: AngularFirestoreCollection<any>;

  constructor(
    private fire: AngularFirestore
  ) { 
    this.messages = fire.collection('message');
  }

  submitMessage(formValue: any) {
    const date = new Date();
    const timestamp = date.getTime();
    return this.messages.add({ ...formValue, timestamp });
  }

}
