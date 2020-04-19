import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { 
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { SeasonYearComponent } from '../_components/season-year/season-year.component';

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
  searchFilters: any[]
  genres: any;
  categories: any;
  searchText: string;
  chipText: any;
  toggleState: any;
  next: string;
  count: number;
  searchSelection: string;
  filters: any[];
  isMenuOpened: any;
  isInputDisabled: any;
  selectedChipIndex: any;

  private _anime: any;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef, 

    private search: SearchService,
    private select: SelectService,
    private shared: SharedService,
    private snotify: SnotifyService
  ) { }

  private initialize() {
    this.anime = [];
    this.searchFilters = [ { type: 'default', name: 'anime' } ];
    this.searchText = '';
    this.chipText = {};
    this.chipText.genre = '\r';
    this.chipText.category = '\r';
    this.toggleState = {};
    this.toggleState.genre = 'less';
    this.toggleState.category = 'less';
    this.searchSelection = 'anime';
    this.filters = [];
    this.isMenuOpened = {};
    this.isMenuOpened.genre = false;
    this.isMenuOpened.category = false;
    this.isInputDisabled = {};
    this.selectedChipIndex = {};
    this.isInputDisabled.genre = true;
    this.isInputDisabled.category = true;
  }
  
  ngOnInit(): void {
    
    this.initialize();
    this.shared.mangaType = this.searchSelection;
    this.shared.updatedSelectRouteSSelection = 'search';
    this.shared.updatedLoadMoreSelection = -1;
    this.genres = this.search.genres;
    this.categories = this.search.categories;

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
      this.isInputDisabled.genre = res === 2 ? false : true;
      this.isInputDisabled.category = res === 2 ? false : true;
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

  enterSeasonYear() {
    const ref = this.dialog.open(SeasonYearComponent, {
      closeOnNavigation: true
    });

    const $1 = ref.afterClosed().subscribe(() => {
      this.snotify.searchNotify();
      this.shared.updatedSearchCharacterSelection = 1;
      $1.unsubscribe();
    });


    const $2 = this.search.mergeSeasonYearDialogResult(ref.afterClosed()).subscribe((res) => {
    
      // console.log(res);

      this.updateSearchFilter(res.year.toString(), 'advanced');
      this.anime = res.data;
      this.next = res.next;
      this.count = +res.count;
      this.shared.updatedLoadMoreSelection = res.next ? 2 : -1;
      this.shared.updatedSearchCharacterSelection = 2;
      $2.unsubscribe();
    });
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
      this.count = +res.count;
      this.shared.updatedLoadMoreSelection = res.next ? 2 : -1;
      this.shared.updatedSearchCharacterSelection = 2;
      $.unsubscribe();
    });
  }

  searchBy(type: string, item: any, index: number) {

    const _type = type === 'genres' ? 'genre' : 'category';

    this.selectedChipIndex[type] = index;
    this.chipText[_type] = item.name;

    this.snotify.searchNotify();
    this.shared.updatedSearchCharacterSelection = 1;

    
    const $ = this.search.searchBy(type, item.name, this.searchSelection).subscribe((res) => {
      
      // console.log(res);
      
      this.updateSearchFilter(item.name, _type);
      this.anime = res.data;
      this.next = res.next;
      this.count = +res.count;
      this.shared.updatedLoadMoreSelection = res.next ? 2 : -1;
      this.shared.updatedSearchCharacterSelection = 2;
      $.unsubscribe();
    });
  }

  searchBy2(type: string, search: string) {

    this.snotify.searchNotify();
    this.shared.updatedSearchCharacterSelection = 1;

    const $ = this.search.searchBy2(type, search).subscribe((res) => {

      // console.log(res);

      this.updateSearchFilter(search, 'advanced');
      this.anime = res.data;
      this.next = res.next;
      this.count = +res.count;
      this.shared.updatedLoadMoreSelection = res.next ? 2 : -1;
      this.shared.updatedSearchCharacterSelection = 2;
      $.unsubscribe();
    });
  }

  searchNext() {
    
    const $ = this.search.searchNext(this.next, this.searchSelection).subscribe((res) => {

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
      this.updateSearchFilter('random', 'advanced');
      this.anime = [ res ];
      this.count = 1;
      this.shared.updatedSearchCharacterSelection = 2;
      $.unsubscribe();
    });
  }

  selectOption(option: boolean) {
    this.searchSelection = option ? 'anime' : 'manga title';
    this.shared.mangaType = this.searchSelection;

    this.updateSearchFilter(this.searchSelection.split(' ')[0], 'default');

    const message = 'Enter ' + this.searchSelection;

    this.snotify.clear();
    this.snotify._notify(message, 'simple', {
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: true,
      timeout: 5000,
      position: SnotifyPosition.leftBottom
    });
  }

  toggle(type: string) {

    Object.keys(this.isMenuOpened).forEach((key) => {
      if (type === key) return;
      this.isMenuOpened[key] = false;
    });

    this.isMenuOpened[type] = !this.isMenuOpened[type];
    this.isMenuOpened[type] ? this.snotify.clear() : (this.chipText[type] = '\r');
  }

  toggleShow(type: string, option: boolean = false) {
    this.chipText[type] = 
      this.chipText[type] === '\n' ? '\r'
      : this.chipText[type] === '\r' ? '\n'
      : this.chipText[type] === '' ? '\r'
      : this.chipText[type];

    if (this.chipText[type] === '\n') {
      this.toggleState[type] = 'all';
    } else if (this.chipText[type] === '\r') {
      this.toggleState[type] = 'less';
    }

    if (!option) return;
    this.chipText[type] = '';
  }

  onEnter(event: KeyboardEvent) {
    if (event.keyCode !== 13) return;
    event.preventDefault();
    this.searchAnime();
    this.reset(false);
  }

  detectValueChanges(type: string, option: boolean = false) {
    
    if (option) {
      this.chipText[type] = '';
    }

    if (this.chipText[type] === '' && this.toggleState[type] === 'all') {
      this.chipText[type] = '\n';
    } else if (this.chipText[type] === '' && this.toggleState[type] === 'less') {
      this.chipText[type] = '\r';
    }

    this.cd.detectChanges();
  }

  updateSearchFilter(name: string, type: string, option: boolean = false) {

    name = name.toLowerCase();

    if (option && (name !== 'anime' && name !== 'manga')) {
      return (this.searchFilters = this.searchFilters.filter(e => e['name'] !== name));
    }

    if (type === 'default') {
      this.searchFilters = []
      this.searchFilters.push({ type, name });
    } else if (type === 'genre') {
      this.searchFilters = this.searchFilters.filter(e => e['type'] !== type && e['type'] !== 'advanced' && e['type'] !== 'category');
      this.searchFilters.push({ type, name });
    } else if (type === 'category') {
      this.searchFilters = this.searchFilters.filter(e => e['type'] !== type && e['type'] !== 'advanced' && e['type'] !== 'genre');
      this.searchFilters.push({ type, name });
    } else if (type === 'advanced') {
      this.searchFilters = this.searchFilters.filter(e => e['type'] !== type && e['type'] !== 'category' && e['type'] !== 'genre');
      this.searchFilters.push({ type, name });
    }
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
    this.isMenuOpened.category = false;
    this.anime = [];
    this.searchFilters = [ { type: 'default', name: 'anime' } ];
    this.searchText = option ? '' : this.searchText;
    this.shared.updatedLoadMoreSelection = -1;
  }

}
