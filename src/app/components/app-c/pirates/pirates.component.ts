import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PiratesService } from '../../../common/core/services/pirates.service';
import { PiratesRecieveService } from '../../../common/core/services/pirates-recieve.service';

import { PiratesModalComponent } from '../../../common/shared/components/pirates-modal/pirates-modal.component';
import 'rxjs/Rx';

import { PirateDetails } from '../../../common/interfaces/pirate-details';

@Component({
  selector: 'dark-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.scss'],
  providers: [PiratesService, PiratesRecieveService]
})
export class PiratesComponent implements OnInit {

    dialogRef: MdDialogRef<PiratesModalComponent> | null;
    pirateInputForm: FormControl;

    list: { PirateDetails }[] = [];
    listDynamic: { PirateDetails }[] = [];

    filteredPirates: any;
    count: number = 1;
    finished: boolean = false;
    // isAutocomplete: boolean = true;

    constructor(private piratesService: PiratesService, private piratesRecieveService: PiratesRecieveService, private router: Router, private route: ActivatedRoute, public dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
      dialog.afterOpen.subscribe( () => { });
      dialog.afterAllClosed.subscribe( () => { });
    }

    ngOnInit() {
      this.piratesRecieveService.initializeData();

      this.piratesService.getPirates_v1().subscribe( (response: any[]) => { this.list = response['data']; });

      this.pirateInputForm = new FormControl();

      this.pirateInputForm.valueChanges.subscribe( (value) => {
        // value.length > 0 ? this.isAutocomplete = false : this.isAutocomplete = true;
      });

      this.filteredPirates = this.pirateInputForm.valueChanges
        .startWith(this.pirateInputForm.value).map(name => this.filterPirates(name));
    }

    onScroll() {
      this.count++;
      this.count < 26
        ? this.piratesService[`getPirates_v${this.count}`]()
          .subscribe( (response: any[]) => {
            // TODO: AUTO COMPLETE
            if (this.list) {
              this.list = this.list.concat(response['data']);
            }
            // this.list ? this.list = this.list.concat(response['data']) : this.list;
          })
        : this.finished = true;
    }

    onInputClick() {
      this.listDynamic = this.piratesRecieveService.list;
    }

    filterPirates(data: string) {
      if (data) {
        const filterValue = data.toLowerCase();
        return this.listDynamic.filter(pirates => pirates['attributes'].name.toLowerCase().startsWith(filterValue)); }

      return this.listDynamic;
    }

    openModal(id: number) {
      id = id - 406;
      const config = {
        data: {
          name: this.list[id]['attributes'].name,
          image: this.list[id]['attributes'].image.original,
          description: this.list[id]['attributes'].description,
        }
      };

      this.dialogRef = this.dialog.open(PiratesModalComponent, config)
      this.dialogRef.afterClosed().subscribe( (result: string) => {
        this.dialogRef = null;
      });
    }

  }
