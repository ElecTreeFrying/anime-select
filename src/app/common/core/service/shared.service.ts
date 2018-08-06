import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private vertical: MatSnackBarVerticalPosition = 'bottom';
  private horizontal: MatSnackBarHorizontalPosition = 'center';

  scrollChanged = new Subject();

  piratesChanged = new Subject();
  autocompleteChanged = new Subject();
  loadPiratesChanged = new Subject();
  loadingAllPiratesChanged = new Subject();

  constructor(
    private snack: MatSnackBar
  ) { }

  snackbar(message: string, duration: number = 99999999999999999999) {
    const config = new MatSnackBarConfig;
    config.duration = duration;
    config.horizontalPosition = this.horizontal;
    config.verticalPosition = this.vertical;

    return this.snack.open(message, '', config);
  }

  closeAllSnackbar() {
    this.snack.dismiss();
  }

  set setScroll(change: any) {
    this.scrollChanged.next(change)
  }

  set setPirates(change: any) {
    this.piratesChanged.next(change);
  }

  set setAutocomplete(change: any) {
    this.autocompleteChanged.next(change);
  }

  set setLoadPiratesChanged(change: any) {
    this.loadPiratesChanged.next(change);
  }

  set setLoadingAllPiratesChanged(change: any) {
    this.loadingAllPiratesChanged.next(change);
  }

}
