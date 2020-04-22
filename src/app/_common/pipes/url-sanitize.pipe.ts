import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


SecurityContext

@Pipe({
  name: 'urlSanitize'
})
export class UrlSanitizePipe implements PipeTransform {

  constructor(
    private sanitize: DomSanitizer
  ) {}

  transform(value: string): any {
    
    if (!value) return;

    const doc = `<iframe width="432" height="242" src="https://www.youtube.com/embed/${value}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    return this.sanitize.bypassSecurityTrustHtml(doc);
  }

}
