import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TemplatePortal } from '@angular/cdk/portal';
import { 
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { sortBy, uniqBy } from 'lodash';

import { ApiService } from '../_common/services/api.service';
import { SharedService } from '../_common/services/shared.service';
import { SnotifyService } from '../_common/services/snotify.service';

import { CharacterComponent } from '../_components/character/character.component';
import { AboutComponent } from '../_components/about/about.component';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  
  @ViewChild('overlay') public component: TemplateRef<any>; 
  overlayRef: OverlayRef;

  _api: any = {};
  filter: FormGroup;
  characters: any[];
  _characters: any[];
  isShowLoading: boolean;
  interval: any;
  isOpened: boolean;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private api: ApiService,
    private shared: SharedService,
    private snotify: SnotifyService
  ) { 
    this.filter = fb.group({ 'field': [ { value: '', disabled: true } ] });
  }

  ngOnInit(): void {
    
    this.snotify.clear();
    this.isOpened = false;
    this.freshLoad(true);
    this.attachOverlay();
    this.filter.get('field').enable();
    
    this.once = 0;

    this._api.shared = this.shared.navigating.subscribe((res) => {
      this.freshLoad(true);
      console.log(res);
      res > 0 ? this.finishInitialLoading() : 0;

      if (res === 2) {
        if (!this.isOpened) {
          this.overlayRef.detach();
          this.overlayRef.dispose();
          this.dialog.open(AboutComponent, {
            closeOnNavigation: true,
            autoFocus: false,
            hasBackdrop: true
          }).afterClosed().subscribe((res) => {
            this.isOpened = false;
          });
        }

        if (this.characters.length > 20) return;
        this.shared.updatedLoadMoreSelection = 55;
        this.isShowLoading = false;
      }
    });

    this._api.refresh = this.api.refresh.subscribe((res) => {
      res ? this.freshLoad() : 0;
    });

    this._api.data = this.api.data.subscribe((res) => {
      res ? this.loadNewCharacters() : 0;    
    });

    this.filter.valueChanges.subscribe((res) => {
      const value = res['field'];
      this.characters = this._characters.filter(e => e['name'].toLowerCase().includes(value));

      if (!value) {
        this.characters = this._characters;
        return;
      }

      if (value.length === 0) {
        this.characters = this._characters;
      }
    });
  }

  once: number;

  finishInitialLoading() {
    if (this.once !== 0) return;
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.isOpened = true;
    this.once++;
    setTimeout(() => {
      this.dialog.open(AboutComponent, {
        closeOnNavigation: true,
        autoFocus: false,
        hasBackdrop: true
      }).afterClosed().subscribe((res) => {
        this.isOpened = false;
        this.shared.updatedSelectRouteSSelection = 'loop';
        this.selectCharacter(null, true)
      });
    }, 200);
  }

  ngOnDestroy() {
    this._api.shared.unsubscribe();
    this._api.refresh.unsubscribe();
    this._api.data.unsubscribe();
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.snotify.clear();
    clearInterval(this.interval);
  }

  attachOverlay() {
    
    const portal = new TemplatePortal(this.component, this.viewContainerRef);
    this.overlayRef = this.overlay.create({
      width: '100vw',
      height: '100vh',
      disposeOnNavigation: true,
      hasBackdrop: false
    });

    this.overlayRef.attach(portal);
  }

  selectCharacter(character: any, type: boolean = false) {

    if (type) {
      // resolves the weird bug
      return this.interval = setInterval(() => {}, 500);
    }

    this.dialog.open(CharacterComponent, { 
      disableClose: false,
      hasBackdrop: true,
      id: character.id,
      closeOnNavigation: true
    }).beforeClosed().subscribe((res) => {
      if (res !== 'to-media') return;
      this.attachOverlay();
    });
  }

  freshLoad(initial: boolean = false) {

    try {

      this.shared.index = 0;
      const characters = this.api.characters;
      this.characters = characters; 
      this._characters = characters; 
      this.cd.detectChanges();
      this.shared.updatedLoadCountSelection = this.characters.length;  
    } catch (error) {

      this.isShowLoading = true;
      this.reloaded();
      this.shared.updatedLoadCountSelection = this.characters.length;  
    }

    if (initial) return;
    setTimeout(
      () => (this.shared.updatedTriggerRefreshSelection = true), 750
    );
  }
  
  loadNewCharacters() {
    const characters = this.api.characters;
    this.characters = this.characters.concat(characters);
    this._characters = this._characters.concat(characters);
    this.cd.detectChanges();
    this.shared.updatedLoadCountSelection = this.characters.length;
  }

  trackByID(index: number, item: any) {
    return item ? item.id : null;
  }

  private reloaded() {
    const session = sessionStorage.getItem('characters');
    const parse = JSON.parse(session)
    const characters = uniqBy(sortBy(parse, [ 'id' ]), 'name');
    this.shared.ceil = Math.ceil(characters.length/20);
    this.shared.floor = Math.floor(characters.length/20)*20;
    this.shared.mediaCharacters = characters;
    this.characters = characters.slice(0, 20); 
    this._characters = characters.slice(0, 20);
    this.cd.detectChanges();
    
    setTimeout(() => {
      if (this.characters.length === 0) {
        this.shared.updatedLoadMoreSelection = 55;
        this.isShowLoading = false;
        this.cd.detectChanges();
      }
      this.finishInitialLoading();
    }, 1000);
  }

}
