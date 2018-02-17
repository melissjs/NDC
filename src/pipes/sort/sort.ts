import { Pollingstation } from './../../models/pollingstation';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(pipeData, field) {
    console.log('PDDDDDDDD', pipeData)
    console.log('FFFFFF', field)
    pipeData.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log('PDDDDDDDD B$ RETURN', pipeData)
    return pipeData;
  }
}
