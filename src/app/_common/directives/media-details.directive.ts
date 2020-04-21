import { Input, Directive, HostListener, ViewContainerRef } from '@angular/core';
import { 
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { MoreDetailsComponent } from '../../_components/more-details/more-details.component';

import { SharedService } from '../services/shared.service';


@Directive({
  selector: '[mediaDetails]'
})
export class MediaDetailsDirective {

  @Input() mediaDetails: any;

  isValid: boolean;
  overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,

    private shared: SharedService
  ) { 
    this.isValid = true;
  }

  @HostListener('mouseenter')
  mouseenter() {
    this.shared.anime = this.mediaDetails;
    this.attachOverlay();
  }
  
  @HostListener('mouseleave')
  mouseleave() {
    this.removeOverlay();
  }
  
  attachOverlay() {
    const portal = new ComponentPortal(MoreDetailsComponent, this.viewContainerRef);
    this.overlayRef = this.overlay.create({
      disposeOnNavigation: true
    });
    
    this.overlayRef.attach(portal);
  }
  
  removeOverlay() {
    this.overlayRef.detach();
    this.overlayRef.dispose();
  }

}
