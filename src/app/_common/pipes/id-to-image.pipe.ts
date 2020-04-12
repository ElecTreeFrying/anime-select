import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToImage'
})
export class IdToImagePipe implements PipeTransform {

  transform(id: number): string {

    if (id === 441 || id === 823) {
      return `https://media.kitsu.io/characters/images/411/original.jpg`;
    }

    return `https://media.kitsu.io/characters/images/${id}/original.jpg`;
  }

}
