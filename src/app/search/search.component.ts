import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
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
  genres: any;
  searchText: string;
  genreText: string;
  next: string;
  searchSelection: string;
  filters: any[];
  isMenuOpened: any;
  isGenreInputDisabled: boolean;

  private _anime: any;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef, 

    private search: SearchService,
    private select: SelectService,
    private shared: SharedService,
    private snotify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.anime = [];
    this.searchText = '';
    this.genreText = '';
    this.searchSelection = 'anime';
    this.filters = [];
    this.isMenuOpened = {};
    this.isGenreInputDisabled = true;
    this.shared.mangaType = this.searchSelection;
    this.shared.updatedSelectRouteSSelection = 'search';
    this.shared.updatedLoadMoreSelection = -1;
    this.genres = this.search.genres;

    this.subscriptions['loadMore'] = this.shared.loadMore.subscribe((res) => {
      if (res !== 1) return;
      this.searchNext();
    });
    
    this.subscriptions['resetSearch'] = this.shared.resetSearch.subscribe((res) => {
      if (res !== 1) return;
      if (this.anime.length > 0) {
        this.snotify._notify('Reset complete', 'success');
      } 
      this.reset();
    });

    this.subscriptions['loadingGenre'] = this.shared.loadingGenre.subscribe((res) => {
      this.isGenreInputDisabled = res === 2 ? false : true;
      this.cd.detectChanges();
    });
  }
  
  ngOnDestroy() {
    this.overlayRef === undefined ? 0 : this.overlayRef.detach();
    this.shared.updatedSelectRouteSSelection = '';

    this.subscriptions['loadMore'] ? this.subscriptions['loadMore'].unsubscribe() : 0;
    this.subscriptions['resetSearch'] ? this.subscriptions['resetSearch'].unsubscribe() : 0;
    this.subscriptions['loadingGenre'] ? this.subscriptions['loadingGenre'].unsubscribe() : 0;
  }

  selectAnime(anime: any) {
    const type = this.searchSelection.split(' ')[0];
    this.select.processSelected(anime, type);
    this.attachOverlay();
  }

  searchAnime() {
    if (this.searchText === '') {
      return this.snotify._notify('Empty search fields.', 'error');
    }

    this._anime = this.search.searchStart(this.searchText, this.searchSelection);
    this.snotify.searchNotify();
    this.shared.updatedSearchCharacterSelection = 1;
    
    const $ = this._anime.subscribe((res) => {

      // console.log(res);

      this.anime = res.data;
      this.next = res.next;
      this.shared.updatedLoadMoreSelection = res.next ? 2 : -1;
      this.shared.updatedSearchCharacterSelection = 2;
      $.unsubscribe();
    });
  }

  selectedGenreIndex: number;

  searchByGenre(genre: any, index: number) {

    this.selectedGenreIndex = index;

    this.snotify.searchNotify();
    this.shared.updatedSearchCharacterSelection = 1;

    const $ = this.search.searchByGenre(genre.name, this.searchSelection).subscribe((res) => {

      // console.log(res);

      this.anime = res.data;
      this.next = res.next;
      this.shared.updatedLoadMoreSelection = res.next ? 2 : -1;
      this.shared.updatedSearchCharacterSelection = 2;
      $.unsubscribe();
    });
  }

  searchNext() {
    
    const $ = this.search.searchNext(this.next, this.searchSelection).subscribe((res) => {

      // console.log(res);

      this.anime = this.anime.concat(res.data);
      this.next = res.next;
      this.shared.updatedLoadMoreSelection = res.next ? 2 : -1;
      this.shared.updatedLoadingMoreSelection = 2;
      $.unsubscribe();
    });
  }

  searchRandom(selection: string) {

    this.snotify.searchNotify();
    this.shared.updatedSearchCharacterSelection = 1;

    const $ = this.search.searchRandom(selection).subscribe((res) => {

      this.reset();
      this.anime = [ res ];
      this.shared.updatedSearchCharacterSelection = 2;
      $.unsubscribe();
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

  toggleGenre() {
    this.isMenuOpened.genre = !this.isMenuOpened.genre; 
    this.genreText = '\r';
  }

  toggleShowGenre() {

    this.genreText = 
      this.genreText === '\n' ? '\r'
      : this.genreText === '\r' ? '\n'
      : this.genreText === '' ? '\r'
      : this.genreText;
  }

  onEnter(event: KeyboardEvent) {
    if (event.keyCode !== 13) return;
    event.preventDefault();
    this.searchAnime();
    this.reset(false);
  }

  genreInputValueChanges(event) {
    this.cd.detectChanges();
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

  private reset(option: boolean = true) {
    this.isMenuOpened.genre = false;
    this.anime = [];
    this.searchText = option ? '' : this.searchText;
    this.genreText = '';
    this.shared.updatedLoadMoreSelection = -1;
  }

}
