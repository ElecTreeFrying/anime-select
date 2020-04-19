import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { 
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { SelectService } from '../_common/services/select.service';
import { SharedService } from '../_common/services/shared.service';
import { SnotifyService } from '../_common/services/snotify.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {

  @ViewChild('overlay') public component: TemplateRef<any>; 
  
  media: any;
  trendingAnime: any;
  trendingManga: any;
  overlayRef: OverlayRef;


  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,

    private select: SelectService,
    private shared: SharedService,
    private snotify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.media = this.select.media;
    this.trendingAnime = this.select.trending(true);
    this.trendingManga = this.select.trending(false);
    this.shared.updatedSelectRouteSSelection = 'select';
    this.normalize();
  }
  
  ngOnDestroy() {
    this.overlayRef === undefined ? 0 : this.overlayRef.detach();
    this.shared.updatedSelectRouteSSelection = '';
  }

  selectAnime(anime: any, type: string = 'anime') {
    this.select.processSelected(anime, type);
    this.attachOverlay();
  }

  attachOverlay() {
    
    const portal = new TemplatePortal(this.component, this.viewContainerRef);
    this.overlayRef = this.overlay.create({
      width: '100vw',
      height: '100vh',
      disposeOnNavigation: true
    });

    this.overlayRef.attach(portal);
  }

  private normalize() {
    this.shared.mediaCharacters = [];
    localStorage.setItem('anime', '');
    localStorage.setItem('slug', '');
    this.shared.index = 0;
    this.shared.ceil = 0;
    this.shared.floor = 0;
  }

}
