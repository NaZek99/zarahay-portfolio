import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { receivedData } from '../receivedData.model';
import { dataToSend } from 'src/app/dataToSend.model';
import { LienService } from '../lien.service';


@Component({
  selector: 'app-brouillon-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brouillon-content.component.html',
  styleUrls: ['./brouillon-content.component.css']
})
export class BrouillonContentComponent implements OnInit {
  afichageListe: boolean = false
  listebrouillon: receivedData[] = [];
  donneesBrouillons = new dataToSend("", "", "");

  constructor(private tout: DataService, public lien: LienService) { }

  encodeURIComponent(path: string): string {
    return encodeURIComponent(path);
 }

  //POSTER UN BROUILLON
  postDraft(element: receivedData) {
    this.tout.postDraft(element)
      .subscribe(
        (reponse) => {
          console.log(reponse);
          window.location.reload()
        }
        ,
        (err) => {
          console.log(err);
        }
      )
  }

  //SUPPRESSION DE BROUILLON
  supprimmerBrouillon(element: receivedData) {
    this.tout.deleteSheet(element)
      .subscribe(
        (response) => {
          console.log("suppression reussie")
          element.visible = false;
        },
        (err) => {
          console.log("erreur lors de la suppresion")
        }
      )

  }

  //CACHER LA LISTE DES BROUILLONS
  hideList() {
    this.lien.draftList = false;
  }

  ngOnInit(): void {
    //AFFICHER LES ELEMENTS DU BROUILLON 
    this.tout.list()
      .subscribe(
        (response) => {

          for (let i = 0; i < response.length; i++) {
            this.listebrouillon[i] = new receivedData(response[i].id_brouillon, response[i].nom, response[i].description, response[i].nom_image, response[i].image_path, response[i].date)
            console.log(response[i].nom + "\n" + response[i].description)
          }

          for (let i = 0; i < this.listebrouillon.length; i++) {
            this.listebrouillon[i].absolute_path = "http://localhost:3000/" + this.listebrouillon[i].path_img;
          }

        },

        (erreur) => {
          console.log("erreur d'affichage")
        }
      )
  }
}
