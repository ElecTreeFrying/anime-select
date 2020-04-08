import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-box',
  templateUrl: './loading-box.component.html',
  styleUrls: ['./loading-box.component.scss']
})
export class LoadingBoxComponent implements OnInit, OnDestroy {

  @Output() event = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.event.next(true);
  }
  
  ngOnDestroy() {
    this.event.next(false);
  }

}
