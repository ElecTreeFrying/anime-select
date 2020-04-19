import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-season-year',
  templateUrl: './season-year.component.html',
  styleUrls: ['./season-year.component.scss']
})
export class SeasonYearComponent implements OnInit {

  @ViewChild('input') public input: ElementRef;
  
  constructor(
    private ref: MatDialogRef<SeasonYearComponent>
  ) { }

  ngOnInit(): void {
  }

  @HostListener('keydown', [ '$event' ])
  keydown(event: KeyboardEvent) {

    const isEnter = event.keyCode === 13;
    const isBackspace = event.keyCode === 8;
    const isLeftArrow = event.keyCode ===	37;
    const isUpArrow = event.keyCode ===	38;
    const isRightArrow = event.keyCode ===	39;
    const isDownArrow = event.keyCode ===	40;
    
    if (isEnter || isBackspace || isLeftArrow || isUpArrow || isRightArrow || isDownArrow) return;

    const value = this.input.nativeElement.value;

    if (value.length < 4) {
      this.input.nativeElement.value = value;
    } else {
      this.input.nativeElement.value = (<string>value.toString()).substring(0, 3);
    }
  }

  onPostResult() {
    const value = this.input.nativeElement.value;
    this.ref.close(+value);
  }

  onEnter(event: KeyboardEvent) {
    if (event.keyCode !== 13) return;
    event.preventDefault();
    this.onPostResult();
  }
}
