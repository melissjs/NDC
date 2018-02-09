import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})

export class SearchPipe implements PipeTransform {
  transform(pipeData, pipeModifier){
    if (pipeModifier == null) {
      return pipeData;
    } else {
        let lowerModifier = pipeModifier.toLowerCase();
        return pipeData.filter((eachItem)=>{
            return eachItem['locationName'].toLowerCase().includes(lowerModifier) ||
              eachItem['streetAddress'].toLowerCase().includes(lowerModifier) ||                
              eachItem['zip'].toString().includes(lowerModifier) ||
              eachItem['city'].toLowerCase().includes(lowerModifier) ||
              eachItem['precinctNumber'].toLowerCase().includes(lowerModifier) ||
              eachItem['state'].toLowerCase().includes(lowerModifier); 
        });
    }
  }
}
