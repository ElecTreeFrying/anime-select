import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { 
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { SearchService } from '../_common/services/search.service';
import { SelectService } from '../_common/services/select.service';
import { SharedService } from '../_common/services/shared.service';
import { SnotifyService } from '../_common/services/snotify.service';
import { SnotifyPosition } from 'ng-snotify';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('overlay') public component: TemplateRef<any>; 

  overlayRef: OverlayRef;
  subscriptions = {};

  anime: any[];
  text: string;
  next: string;
  searchSelection: string;
  
  private _anime: any;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,

    private search: SearchService,
    private select: SelectService,
    private shared: SharedService,
    private snotify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.anime = [];
    this.text = '';
    this.searchSelection = 'anime';
    this.shared.mangaType = this.searchSelection;
    this.shared.updatedSelectRouteSSelection = 'search';
    this.shared.updatedLoadMoreSelection = -1;

    this.subscriptions['loadMore'] = this.shared.loadMore.subscribe((res) => {
      if (res !== 1) return;
      this.searchNext();
    });
    
    this.shared.resetSearch.subscribe((res) => {
      if (res !== 1) return;
      if (this.anime.length > 0) {
        this.snotify._notify('Reset complete', 'success');
      } 
      this.anime = [];
      this.text = '';
      this.shared.updatedLoadMoreSelection = -1;
    });
  }
  
  ngOnDestroy() {
    this.overlayRef === undefined ? 0 : this.overlayRef.detach();
    this.shared.updatedSelectRouteSSelection = '';

    this.subscriptions['loadMore'] ? this.subscriptions['loadMore'].unsubscribe() : 0;
    this.subscriptions['_anime'] ? this.subscriptions['_anime'].unsubscribe() : 0;
    this.subscriptions['searchNext'] ? this.subscriptions['searchNext'].unsubscribe() : 0;
  }

  selectAnime(anime: any) {
    this.select.processSelected(anime, 'manga');
    this.attachOverlay();
  }

  searchAnime() {
    if (this.text === '') {
      return this.snotify._notify('Empty search fields.', 'error');
    }

    this._anime = this.search.searchStart(this.text, this.searchSelection);
    this.snotify.searchNotify();
    this.shared.updatedSearchCharacterSelection = 1;
    
    this.subscriptions['_anime'] = this._anime.subscribe((res) => {
      this.anime = res.data;
      this.next = res.next;
      this.shared.updatedLoadMoreSelection = 2;
      this.shared.updatedSearchCharacterSelection = 2;
    });
  }

  searchNext() {
    
    console.log(this.next, this.searchSelection);
    this.subscriptions['searchNext'] = this.search.searchNext(this.next, this.searchSelection).subscribe((res) => {
      this.anime = this.anime.concat(res.data);
      this.next = res.next;
      this.shared.updatedLoadingMoreSelection = 2;
    });
  }

  selectOption(option: boolean) {
    this.searchSelection = option ? 'anime' : 'manga title';
    this.shared.mangaType = this.searchSelection;

    const message = 'Enter ' + this.searchSelection;

    this.snotify.clear();
    this.snotify._notify(message, 'simple', {
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: true,
      timeout: 5000,
      position: SnotifyPosition.leftBottom
    })
  }

  onEnter(event: KeyboardEvent) {
    
    if (event.keyCode !== 13) return;
    event.preventDefault();
    this.searchAnime();
  }

  private attachOverlay() {
    
    const portal = new TemplatePortal(this.component, this.viewContainerRef);
    this.overlayRef = this.overlay.create({
      width: '100vw',
      height: '100vh',
      disposeOnNavigation: true
    });

    this.overlayRef.attach(portal);
  }

}
