import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { SharedService } from '../_common/services/shared.service';
import { FirestoreService } from '../_common/services/firestore.service';
import { SnotifyService } from '../_common/services/snotify.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  
  form: FormGroup;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private shared: SharedService,
    private fire: FirestoreService,
    private snotify: SnotifyService
  ) { 
    this.form = fb.group({
      'email': [ '' ],
      'message': [ '' ],
    })
  }

  ngOnInit(): void {
    this.shared.updatedSelectRouteSSelection = 'contact';
  }
  
  ngOnDestroy() {
    this.shared.updatedSelectRouteSSelection = '';
  }
  
  submit() {

    const form = this.form.value;
    const email = form.email;
    const message = form.message;

    const isEmailValid = email.length > 5;
    const isMessageValid = message.length > 5

    if (email.length === 0 || message.length === 0) {
      return this.snotify._notify('Empty fields.', 'error');
    }

    if (!isEmailValid || !isMessageValid) {
      return this.snotify._notify('Please try again.', 'error');
    };
    
    const formValue = this.form.value;
    
    this.snotify.submitMessageNotify('Message');
    this.shared.updatedLoadingGenreSelection = 1;
    
    this.fire.submitMessage(formValue).then(() => {
      this.shared.updatedLoadingGenreSelection = 2;
      this.form.patchValue({ email: '', message: '' });
    });
  }

}
