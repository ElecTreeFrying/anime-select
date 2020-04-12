import { Injectable } from '@angular/core';
import { SnotifyService as Snotify, SnotifyPosition, SnotifyType, SnotifyToastConfig } from 'ng-snotify';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SnotifyService {

  constructor(
    private snotify: Snotify,
    private shared: SharedService
  ) { }

  config(option: SnotifyToastConfig): SnotifyToastConfig {
    return option;
  }

  refreshCharactersNotify() {

    const action = Observable.create(observer => {

      this.shared.triggerRefresh.subscribe((res) => {

        if (!res) {
          
          observer.next({
            body: `Refreshing cards...`,
            config: this.config({
              closeOnClick: true
            })
          });
        } else {

          observer.next({
            body: 'Successfully refreshed character entries!',
            config: this.config({
              closeOnClick: true,
              pauseOnHover: true,
              showProgressBar: true,
              timeout: 5000
            })
          });
          observer.complete();  
        }
      });
    });

    this.closeAllInstance();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  loadInitialCharacters() {

    const action = Observable.create(observer => {
      
      this.shared.loadingInitial.subscribe((res) => {

        if (!res) {

          observer.next({
            title: 'Loading',
            body: `Please wait...`,
            config: this.config({ closeOnClick: true })
          });
        } else {
          
          observer.next({
            title: 'Successful',
            body: `Loading complete.`,
            config: this.config({
              closeOnClick: true,
              pauseOnHover: true,
              showProgressBar: true,
              timeout: 5000
            })
          });
          observer.complete();
        }
      }); 
    });

    this.closeAllInstance();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  loadAllCharactersNotify() {

    var isWait = false;

    const action = Observable.create(observer => {

      this.shared.subscription = this.shared.loadCount.subscribe((res: any) => {

        if (res === 480) {
          
          isWait = true;
          observer.next({
            body: `Please wait...`
          });
        } else if (res === 495) {
          
          setTimeout(() => {
            observer.complete();
            this.closeAllInstance();
            this._notify('Successfully loaded all 495 characters.', 'success')  
            this.shared.subscription.unsubscribe();
          }, 1000);
        } else {
  
          observer.next({
            body: `Loading ${res + 20} characters.`
          });
        }
      })
    });

    this.closeAllInstance();
    this.snotify.async('', action, {
      buttons: [
        {
          text: 'CANCEL',
          bold: true,
          action: () => {
            if (isWait) return;
            this.shared.subscription.unsubscribe();
            clearInterval(this.shared.interval);
            clearTimeout(this.shared.timeout);
            this.shared.updatedLoadCancelSelection = true;
            this.closeAllInstance();
            this._notify('Load canceled.', "info");
          }
        }
      ],
      position: SnotifyPosition.leftBottom
    });
  }


  _notify(text: string, _type: SnotifyType, config: SnotifyToastConfig = {
    closeOnClick: true,
    pauseOnHover: true,
    showProgressBar: true,
    timeout: 5000,
    position: SnotifyPosition.leftBottom,
    type: _type
  }) {

    this.snotify.create({
      body: text,
      config
    })
  }

  private closeAllInstance() {
    this.snotify.clear();
  }

}
