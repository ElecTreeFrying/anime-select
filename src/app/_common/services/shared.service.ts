import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { mergeMap, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private observable: Observable<any>;

  private loadCountSource = new BehaviorSubject(false);
  private triggerRefreshSource = new BehaviorSubject(false);
  private loadCancelSource = new BehaviorSubject(false);
  private characterSource = new BehaviorSubject(this.observable);
  private mediaSource = new BehaviorSubject([]);
  private navigatingSource = new BehaviorSubject(0);
  private selectRouteSource = new BehaviorSubject('');
  private loadMoreSource = new BehaviorSubject(0);
  private searchCharacterSource = new BehaviorSubject(0);
  private loadingMoreSource = new BehaviorSubject(0);
  private resetSearchSource = new BehaviorSubject(0);

  loadCount = this.loadCountSource.asObservable();
  triggerRefresh = this.triggerRefreshSource.asObservable();
  loadCancel = this.loadCancelSource.asObservable();
  character = this.characterSource.asObservable().pipe( mergeMap(r => r) );
  media = this.mediaSource.asObservable();
  navigating = this.navigatingSource.asObservable();
  selectRoute = this.selectRouteSource.asObservable().pipe( startWith(false) );
  loadMore = this.loadMoreSource.asObservable();
  searchCharacter = this.searchCharacterSource.asObservable();
  loadingMore = this.loadingMoreSource.asObservable();
  resetSearch = this.resetSearchSource.asObservable();

  interval: any;
  timeout: any;
  subscription: Subscription;

  private _count: any;
  set count(count: any) { this._count = count; }
  get count() { return this._count; }

  private _episodePrev: any;
  set episodePrev(prev: any) { this._episodePrev = prev; }
  get episodePrev() { return this._episodePrev; }
  
  private _staffPrev: any;
  set staffPrev(prev: any) { this._staffPrev = prev; }
  get staffPrev() { return this._staffPrev; }

  private _anime: any;
  set anime(anime: any) { this._anime = anime; }
  get anime() { return this._anime }

  private _mediaCharacters: any;
  set mediaCharacters(mediaCharacters: any) { this._mediaCharacters = mediaCharacters; }
  get mediaCharacters() { return this._mediaCharacters }

  private _index: number;
  set index(index: number) { this._index = index; }
  get index() { return this._index }
  
  private _ceil: number;
  set ceil(ceil: number) { this._ceil = ceil; }
  get ceil() { return this._ceil }

  private _floor: number;
  set floor(floor: number) { this._floor = floor; }
  get floor() { return this._floor }

  private _mangaType: string;
  set mangaType(mangaType: string) { this._mangaType = mangaType; }
  get mangaType() { return this._mangaType }

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

  set updatedCharacterSelection(data: Observable<any>) {
    this.characterSource.next(data);
  }

  set updatedMediaSelection(data: any[]) {
    this.mediaSource.next(data);
  }

  set updatedNavigatingSelection(data: any) {
    this.navigatingSource.next(data);
  }

  set updatedSelectRouteSSelection(data: any) {
    this.selectRouteSource.next(data);
  }

  set updatedLoadMoreSelection(data: any) {
    this.loadMoreSource.next(data);
  }

  set updatedSearchCharacterSelection(data: any) {
    this.searchCharacterSource.next(data);
  }

  set updatedLoadingMoreSelection(data: any) {
    this.loadingMoreSource.next(data);
  }

  set updatedResetSourceSelection(data: any) {
    this.resetSearchSource.next(data);
  }

}
