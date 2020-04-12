import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  observable: Observable<any>;

  private loadCountSource = new BehaviorSubject(false);
  private triggerRefreshSource = new BehaviorSubject(false);
  private loadCancelSource = new BehaviorSubject(false);
  private loadingInitialSource = new BehaviorSubject(false);
  private characterSource = new BehaviorSubject(this.observable);
  private mediaSource = new BehaviorSubject([]);

  loadCount = this.loadCountSource.asObservable();
  triggerRefresh = this.triggerRefreshSource.asObservable();
  loadCancel = this.loadCancelSource.asObservable();
  loadingInitial = this.loadingInitialSource.asObservable();
  character = this.characterSource.asObservable().pipe( mergeMap(r => r) );
  media = this.mediaSource.asObservable();

  interval: any;
  timeout: any;
  subscription: Subscription;
  
  constructor() { }

  set updatedLoadCountSelection(data: any){
    this.loadCountSource.next(data)
  }

  set updatedTriggerRefreshSelection(data: any) {
    this.triggerRefreshSource.next(data);
  }

  set updatedLoadCancelSelection(data: any) {
    this.loadCancelSource.next(data);
  }

  set updatedLoadingInitialSelection(data: any) {
    this.loadingInitialSource.next(data);
  }

  set updatedCharacterSelection(data: Observable<any>) {
    this.characterSource.next(data);
  }

  set updatedMediaSelection(data: any[]) {
    this.mediaSource.next(data);
  }

}
