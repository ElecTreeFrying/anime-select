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

  submitMessageNotify() {
    
    const action = Observable.create(observer => {

      const $ = this.shared.loadingGenre.subscribe((res) => {
      
        if (res == 1) {
          
          observer.next({
            body: `Please wait...`,
            config: this.config({
              closeOnClick: true
            })
          });
        } else if (res == 2) {
  
          observer.next({
            body: `Message submitted!`,
            config: this.config({
              closeOnClick: true,
              pauseOnHover: true,
              showProgressBar: true,
              timeout: 5000
            })
          });
          observer.complete();
          $.unsubscribe();
        }
      });
      
    });


    this.clear();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  loadingGenreNotify(type: string) {
    
    const action = Observable.create(observer => {

      const $ = this.shared.loadingGenre.subscribe((res) => {
      
        if (res == 1) {
          
          observer.next({
            body: `Loading ${type}...`,
            config: this.config({
              closeOnClick: true
            })
          });
        } else if (res == 2) {
  
          observer.next({
            body: `Loaded all ${type}!`,
            config: this.config({
              closeOnClick: true,
              pauseOnHover: true,
              showProgressBar: true,
              timeout: 5000
            })
          });
          observer.complete();
          $.unsubscribe();
        }
      });
      
    });


    this.clear();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  loadNotify() {
    
    const action = Observable.create(observer => {

      const $ = this.shared.loadingMore.subscribe((res) => {
      
        if (res == 1) {
          
          observer.next({
            body: `Loading...`,
            config: this.config({
              closeOnClick: true
            })
          });
        } else if (res == 2) {
  
          const withSuffix = this.shared.mangaType !== 'anime' ? 's' : '';

          observer.next({
            body: `Loaded new ${this.shared.mangaType}${withSuffix}!`,
            config: this.config({
              closeOnClick: true,
              pauseOnHover: true,
              showProgressBar: true,
              timeout: 5000
            })
          });
          observer.complete();
          $.unsubscribe();
        }
      });
      
    });


    this.clear();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  searchNotify() {
    
    const action = Observable.create(observer => {

      const $ = this.shared.searchCharacter.subscribe((res) => {
      
        if (res == 1) {
          
          observer.next({
            body: `Searching...`,
            config: this.config({
              closeOnClick: true
            })
          });
        } else if (res == 2) {
  
          observer.next({
            body: 'Search complete!',
            config: this.config({
              closeOnClick: true,
              pauseOnHover: true,
              showProgressBar: true,
              timeout: 5000
            })
          });
          observer.complete();
          $.unsubscribe();
        }
      });
      
    });


    this.clear();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  refreshCharactersNotify() {

    const action = Observable.create(observer => {

      const $ = this.shared.triggerRefresh.subscribe((res) => {

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
          $.unsubscribe();
        }
      });
    });

    this.clear();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  loadAllCharactersNotify() {

    var isWait = false, isMax = false;

    const action = Observable.create(observer => {

      this.shared.subscription = this.shared.loadCount.subscribe((res: any) => {

        if (res === this.shared.floor) {
          
          isWait = true;
          observer.next({
            body: `Please wait...`
          });
        } else if (res === this.shared.mediaCharacters.length) {
          
          setTimeout(() => {
            if (isMax) return;
            observer.complete();
            this.clear();
            this._notify(`Successfully loaded all ${this.shared.mediaCharacters.length} characters.`, 'success')  
            this.shared.subscription.unsubscribe();
            isMax = true;
          }, 1000);
        } else {
  
          observer.next({
            body: `Loading ${res + 20} characters.`
          });
        }
      })
    });

    this.clear();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom,
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
            this.clear();
            this._notify('Load canceled.', "info");
          }
        }
      ]      
    }).on('destroyed', () => {
      this.shared.subscription.unsubscribe();
      clearInterval(this.shared.interval);
      clearTimeout(this.shared.timeout);
      this.shared.updatedLoadCancelSelection = true;
    });
  }


  _notify(text: string, _type: SnotifyType, config: SnotifyToastConfig = {
    closeOnClick: true,
    pauseOnHover: true,
    showProgressBar: true,
    timeout: 5000,
    position: SnotifyPosition.leftBottom,
    type: _type
  }, title: string = undefined) {

    this.snotify.create({
      title,
      body: text,
      config
    })
  }

  clear() {
    this.snotify.clear();
  }

}
