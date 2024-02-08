import { Injectable } from '@angular/core';
import { modify } from './event/modify.model';
import { receivedData } from './receivedData.model';
import { DataService } from '../data.service';
@Injectable({
  providedIn: 'root'
})
export class LienService {
  draftList : boolean = false
  toUpdate: boolean = false
  updatedData= new modify("","","")
  constructor(private tout : DataService) { }

  //LIEN  ENTRE LE COMPOSANT BROUILLON ET LE COMPOSANT EVENT
  //CODE DE MODIFICATION D'UN BROUILLON
  //**** MANOMBOKA ETO ****
  updateDraft(element : receivedData){
    this.draftList =false
     this.toUpdate = true
     this.updatedData.nom = element.nom;
     this.updatedData.description = element.description;
     this.updatedData.id = element.id
     
   }

    
  priseImageModif(event: any){
    this.updatedData.image = event.target.files[0];
    console.log(this.updatedData.image)
   }

  submitUpdate( ){
    this.tout.updateDraft(this.updatedData)
    .subscribe(
      (response)=>{
        console.log(response);
        window.location.reload()
        this.toUpdate = false;
      },
      (err)=>{
        console.log(err);
      }
    )
    
   
  }
//**** HATRETO ****


//LIEN ENTRE LE COMPOSANT BROUILLON-CONTENT ET LE COMPOSANT EVENT
//CODE D'AFFICHAGE DE LA FENETRE DE LA LISTE DE BROUILLON
//** MANOMBOKA ETO **
displayDraft(){
  this.draftList = true;
}
//** HATRETO ** 
}
