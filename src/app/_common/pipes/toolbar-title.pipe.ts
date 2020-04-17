import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toolbarTitle'
})
export class ToolbarTitlePipe implements PipeTransform {

  transform(value: any): any {
    if (value === 'x') {
      return localStorage.getItem('anime') !== '';
    } else if (value === '') {
      console.log(localStorage.getItem('anime'));
      return localStorage.getItem('anime');
    }
  }

}
