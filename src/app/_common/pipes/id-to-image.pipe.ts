import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToImage'
})
export class IdToImagePipe implements PipeTransform {

  transform(id: number): string {
    return `https://media.kitsu.io/characters/images/${id}/original.jpg`;
  }

}
