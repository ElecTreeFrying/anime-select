import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CharacterComponent } from '../_components/character/character.component';

import { ApiService } from '../_common/services/api.service';
import { SharedService } from '../_common/services/shared.service';
import { SnotifyService } from '../_common/services/snotify.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  
  filter: FormGroup;
  characters: any[];
  _characters: any[];

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private api: ApiService,
    private shared: SharedService,
    private snotify: SnotifyService
  ) { 
    this.filter = fb.group({ 'field': [ { value: '', disabled: true } ] });
  }

  ngOnInit(): void {
    this.snotify.loadInitialCharacters();
    this.shared.updatedLoadingInitialSelection = false;
    
    this.api._characters({ next: false }).data.subscribe((res: any) => {
      this.characters = res;
      this._characters = res;
      this.filter.get('field').enable();
      this.shared.updatedLoadingInitialSelection = true;
    });

    this.api.refresh.subscribe((res) => {
      if (!res) return;
      this.freshLoad();
    });

    this.api.data.subscribe((res) => {
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

  selectCharacter(character: any) {
    this.dialog.open(CharacterComponent, { 
      disableClose: false,
      hasBackdrop: true,
      id: character.id
    });
  }

  freshLoad() {
    this.api._freshLoad.subscribe((res: any) => {
      this.characters = res; 
      this._characters = res; 
      this.cd.detectChanges();
      this.shared.updatedLoadCountSelection = this.characters.length;
      this.shared.updatedTriggerRefreshSelection = true;
    });
  }

  loadNewCharacters() {
    const load = this.api._characters({ next: true });

    load.data.subscribe((load: any) => {
      
      if (load.id >= 885) return;
      this.characters = this.characters.concat(load);
      this._characters = this._characters.concat(load);
      this.cd.detectChanges();
      this.shared.updatedLoadCountSelection = this.characters.length;
    });
  }

  trackByID(index: number, item: any) {
    return item ? item.id : null;
  }

}
