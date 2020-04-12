import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    
    this.api.characters({ next: false }).data.subscribe((res) => {
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

    // this.selectCharacter({id: 411, name: "Luffy Monkey D."});
  }

  selectCharacter(character: any) {
    this.dialog.open(CharacterComponent, {
      data: character,
      closeOnNavigation: true,
      autoFocus: false,
      hasBackdrop: true
    });
  }

  freshLoad() {
    this.api.freshLoad.subscribe((res) => {
      this.characters = res; 
      this._characters = res; 
      this.cd.detectChanges();
      this.shared.updatedLoadCountSelection = this.characters.length;
      this.shared.updatedTriggerRefreshSelection = true;
    });
  }

  loadNewCharacters() {
    const load = this.api.characters({ next: true });

    load.data.subscribe((load) => {
      
      if (load.id >= 885) return;
      this.characters = this.characters.concat(load);
      this._characters = this._characters.concat(load);
      this.cd.detectChanges();
      this.shared.updatedLoadCountSelection = this.characters.length;
    });
  }

}
