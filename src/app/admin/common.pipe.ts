import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'common'
})
export class CommonPipe implements PipeTransform {

  transform(stdObj:Object[], commonTerm: string): any[] {
    if(!commonTerm)
    {
    return stdObj;
    }
    else
    {
    return stdObj.filter(std=>std["first"].toLowerCase().indexOf(commonTerm.toLowerCase())!==-1)
    }
    }
  }
