import { Pipe, PipeTransform } from '@angular/core';
import { lowerCase } from 'lodash';


@Pipe({
  name: 'fixSearchChips'
})
export class FixSearchChipsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    if (value === 'popularityRank (highest)' || value === 'popularityRank (lowest)') {

      value = value === 'popularityRank (lowest)' ? 'popularityRank (highest)'  : 'popularityRank (lowest)';

      value = `${lowerCase(value.split(' ')[0])} ${value.split(' ')[1]}`;
      
      return value;
    }

    if (value === 'ratingRank (highest)' || value === 'ratingRank (lowest)') {

      value = value === 'ratingRank (lowest)' ? 'ratingRank (highest)'  : 'ratingRank (lowest)';

      value = `${lowerCase(value.split(' ')[0])} ${value.split(' ')[1]}`;
      
      return value;
    }

    value = `${lowerCase(value.split(' ')[0])} ${value.split(' ')[1]}`;

    return value;
  }

}
