import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { dataToSend } from '../dataToSend.model';
import { receivedData } from './admin/receivedData.model';
import { modify } from './admin/event/modify.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  poster : string = 'http://localhost:3000/poster';
  insertSheet: string= 'http://localhost:3000/insererbrouillon';
  sheetList : string = "http://localhost:3000/afficherbrouillon";
  supprimer : string = "http://localhost:3000/supprimerBrouillon";
  postBrouillon : string = "http://localhost:3000/posterBrouillon";
  afficherEvent : string = "http://localhost:3000/afficherEvent"
  majBrouillon  : string = "http://localhost:3000/modifierBrouillon"


  getPosts(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.apiUrl}/posts`);
  }

  constructor(private httpclient : HttpClient) { }
  
    //INSERER UN BROUILLON
    insert(formData: dataToSend):Observable<any> { 
      console.log("envoi du brouillon en cours : \n" )
       let data = new FormData()
   
       
       data .append('nom' , formData.nom)
       data.append('description' , formData.description)
       data.append('date' , formData.date.toString());
   
       if (formData.image){
         data.append('image' , formData.image)

         console.log("au final :  \n" + formData )
         return this.httpclient.post(this.insertSheet , data )
       }
       
       else {
         console.log("aucun fichier")
         return of ("rien")
       }
     }


       //FAIRE UN POST
  makePost(formData: dataToSend):Observable<any> { 
    console.log("envoi du post en cours : \n" )
    let data = new FormData()

    data .append('nom' , formData.nom);
    data.append('description' , formData.description);
    data.append('date' , formData.date.toString());
    
    if (formData.image){
      data.append('image' , formData.image)
      console.log("au final :  \n")
      console.log(data)
      return this.httpclient.post(this.poster , data )
    }
    
    else {
      console.log("aucun fichier")
      return of ("rien")
    }
  }

   //LISTE DES BROUILLONS
 list():Observable<any> { 
  return this.httpclient.get(this.sheetList)
}

  //SUPPRIMER UN BROUILLON
  deleteSheet(element : receivedData):Observable<any>{
    console.log("donnees a envoyer : \n")
    console.log(element)
  return this.httpclient.post(this.supprimer,element)
  }

//POSTER UN BROUILLON
  postDraft(element : receivedData): Observable<any>{
    return this.httpclient.post(this.postBrouillon , element)
  }
  
  //AFICHER LES POSTS
  displayPost():Observable<any>{
    return this.httpclient.get(this.afficherEvent)
  }


   //MODIFIER UN BROUILLON
   updateDraft(draft : modify):Observable<any>{
    let data = new FormData()
    
      data.append('id' , draft.id.toString())
      data.append('nom' , draft.nom)
      data.append('description' , draft.description)
      data.append('date' , draft.date.toString())
    
    if (draft.image){
      console.log("avec image")
      data.append('image' , draft.image)
      console.log(draft.image);
      return this.httpclient.post(this.majBrouillon , data)
    }
    else{
      console.log("sans image")
      data.append('image' ,"pas d'image")
      console.log(data)
      return this.httpclient.post(this.majBrouillon , data)

    }
    
  }
}