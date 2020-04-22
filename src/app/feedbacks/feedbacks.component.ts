import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


import { SharedService } from '../_common/services/shared.service';
import { FirestoreService } from '../_common/services/firestore.service';
import { SnotifyService } from '../_common/services/snotify.service';


@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  isSubmitting: boolean;
  
  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private shared: SharedService,
    private fire: FirestoreService,
    private snotify: SnotifyService
  ) { 
    this.form = fb.group({
      'bug': fb.group({
        'issue': [ '' ]
      }),
      'feature': fb.group({
        'name': [ '' ],
        'description': [ '' ]
      }),
      'feedback': fb.group({
        'message': [ '' ]
      })
    })
  }

  ngOnInit(): void {
    this.shared.updatedSelectRouteSSelection = 'feedbacks';
  }
  
  ngOnDestroy() {
    this.shared.updatedSelectRouteSSelection = '';
  }

  submitBugs() {
    const form = this.form.value.bug;
    const issue = form.issue;

    const isIssueValid = issue.length > 5;

    if (issue.length === 0) {
      return this.snotify._notify('Empty fields.', 'error');
    }

    if (!isIssueValid) {
      return this.snotify._notify('Please try again.', 'error');
    };

    this.isSubmitting = true;
    this.push(form, 0);
  }
  
  submitFeatures() {
    const form = this.form.value.feature;
    const name = form.name;
    const description = form.description;

    const isNameValid = name.length > 5;
    const isDescriptionValid = description.length > 5

    if (name.length === 0 || description.length === 0) {
      return this.snotify._notify('Empty fields.', 'error');
    }

    if (!isNameValid || !isDescriptionValid) {
      return this.snotify._notify('Please try again.', 'error');
    };

    this.isSubmitting = true;
    this.push(form, 1);
  }

  submitFeedback() {
    const form = this.form.value.feedback;
    const message = form.message;

    const isMessageValid = message.length > 5;

    if (message.length === 0) {
      return this.snotify._notify('Empty fields.', 'error');
    }

    if (!isMessageValid) {
      return this.snotify._notify('Please try again.', 'error');
    };

    this.isSubmitting = true;
    this.push(form, 2);
  }

  private push(form: any, option: number) {

    const message = 
      option === 0 
        ? 'Bug issue' 
      : option === 1 
        ? 'Feature request'
      : option === 2
        ? 'Feedback'
      : '';

    this.snotify.submitMessageNotify(message);
    this.shared.updatedLoadingGenreSelection = 1;
    
    option === 0
      ? this.fire.submitBugs(form).then(() => {
        this.shared.updatedLoadingGenreSelection = 2;
        this.form.patchValue({ bug: { issue: '' }});
        this.isSubmitting = false;
      })
    : option === 1 
      ? this.fire.submitFeature(form).then(() => {
        this.shared.updatedLoadingGenreSelection = 2;
        this.form.patchValue({ feature: { name: '', description: '' }});
        this.isSubmitting = false;
      })
    : option === 2
      ? this.fire.submitFeedback(form).then(() => {
        this.shared.updatedLoadingGenreSelection = 2;
        this.form.patchValue({ feedback: { message: '' }});
        this.isSubmitting = false;
      }) : 0;
  }

}
