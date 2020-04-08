import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



import { ApiService } from '../_common/services/api.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  
  filter: FormGroup;
  characters: any[];

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private api: ApiService
  ) { 
    this.filter = fb.group({ 'field': [ '' ] })
  }

  ngOnInit(): void {
    
    this.api.pirate({ next: false }).data.subscribe((res) => {
      this.characters = res; 
    });

    this.api.refresh.subscribe((res) => {
      if (!res) return;
      this.freshLoad();
    });

    this.api.data.subscribe((res) => {
      res ? this.loadNewCharacters() : 0;    
    });
  }

  freshLoad() {
    this.api.freshLoad.subscribe((res) => {
      this.characters = res; 
      this.cd.detectChanges();
    });
  }

  loadNewCharacters() {
    const load = this.api.pirate({ next: true });

    load.data.subscribe((load) => {
      
      if (load.id >= 885) return;
      this.characters = this.characters.concat(load);
      this.cd.detectChanges();
      console.log(this.characters.length);
    });
  }

}
