import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  //pollingstationservice: Pollingstationservice;
  
      transform(pipeData, pipeModifier){
          //this.pollingstationservice = pollingstationservice;
          if (pipeModifier == null) {
              return pipeData;
          } else {
        var lowerModifier = pipeModifier.toLowerCase();
              return pipeData.filter((eachItem)=>{
                  return eachItem['streetAddress'].toLowerCase().includes(lowerModifier) ||                
                      eachItem['zip'].toString().includes(lowerModifier) ||
                      eachItem['city'].toLowerCase().includes(lowerModifier) ||
                      eachItem['precinctNumber'].toLowerCase().includes(lowerModifier) ||
                      eachItem['state'].toLowerCase().includes(lowerModifier); 
              });
          }
      }
  }
  
  
  
  
   
     // Takes a value and makes it lowercase. Came with pipe genrated page, keeping for reference
     
   /*transform(value: string, args: any[]) {
      value = value + ''; // make sure it's a string
      return value.toLowerCase();
    }*/
  
   // pollingstationservice.passedStations.