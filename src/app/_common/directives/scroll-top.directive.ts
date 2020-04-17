import { OnInit, Directive, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: '[scrollTop]'
})
export class ScrollTopDirective implements OnInit {
  
  @Input() option: boolean;
  @Input() scrollTop: MatButton;
  @Input() scrollEl: CdkScrollable;
  @Output() reveal = new EventEmitter();

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    var emit;

    this.scrollEl.elementScrolled().subscribe((res: Event) => {
      const target = <HTMLElement>res.target;
      const scrollValue = target.scrollTop;

      if (this.option) return;

      if (scrollValue === 0) { this.reveal.emit(0); }

      if (scrollValue > 170 && !emit) {
        this.renderer.removeClass(element, 'bounceOut');
        this.renderer.addClass(element, 'bounceIn');
        emit = true;
        this.reveal.emit(true);
      } else if (scrollValue < 170 && emit) {
        this.renderer.removeClass(element, 'bounceIn');
        this.renderer.addClass(element, 'bounceOut');
        setTimeout(() => {
          emit = false;
          this.reveal.emit(false);
        }, 2000);
      }
    });

    const element = <HTMLElement>this.scrollTop._elementRef.nativeElement;
    this.renderer.addClass(element, 'animated');
    this.renderer.addClass(element, 'bounceIn');
    this.renderer.removeClass(element, 'bounceOut');
  }
  
  @HostListener('click', [ '$event' ])
  click() {
    const element = <HTMLElement>this.scrollTop._elementRef.nativeElement;
    this.renderer.removeClass(element, 'tada');
    this.renderer.removeClass(element, 'bounceIn');
    this.renderer.addClass(element, 'pulse');
  }
  
  @HostListener('mouseover', [ '$event' ])
  mouseover() {
    const element = <HTMLElement>this.scrollTop._elementRef.nativeElement;
    this.renderer.removeClass(element, 'bounceIn');
    this.renderer.removeClass(element, 'pulse');
    this.renderer.addClass(element, !this.option ? 'tada' : 'rubberBand');
  }
  
  @HostListener('mouseleave', [ '$event' ])
  mouseleave() {
    const element = <HTMLElement>this.scrollTop._elementRef.nativeElement;
    this.renderer.removeClass(element, !this.option ? 'tada' : 'rubberBand');
    this.renderer.removeClass(element, 'pulse');
  }

}

