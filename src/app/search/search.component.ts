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
    this.searchSelection = 'anime';
    this.shared.mangaType = this.searchSelection;
    this.shared.updatedSelectRouteSSelection = 'search';
    this.shared.updatedLoadMoreSelection = -1;

    this.shared.loadMore.subscribe((res) => {
      if (res !== 1) return;
      this.searchNext();
    });
  }
  
  ngOnDestroy() {
    this.overlayRef === undefined ? 0 : this.overlayRef.detach();
    this.shared.updatedSelectRouteSSelection = '';
  }

  selectAnime(anime: any) {
    this.select.processSelected(anime, 'manga');
    this.attachOverlay();
  }

  searchAnime() {
    this._anime = this.search.searchStart(this.text, this.searchSelection);
    this.snotify.searchNotify();
    this.shared.updatedSearchCharacterSelection = 1;
    
    this._anime.subscribe((res) => {
      this.anime = res.data;
      this.next = res.next;
      this.shared.updatedLoadMoreSelection = 2;
      this.shared.updatedSearchCharacterSelection = 2;
    });
  }

  searchNext() {
    
    console.log(this.next, this.searchSelection);
    this.search.searchNext(this.next, this.searchSelection).subscribe((res) => {
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
