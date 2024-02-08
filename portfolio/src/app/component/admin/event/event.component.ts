import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataToSend } from 'src/app/dataToSend.model';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { LienService } from '../lien.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private tout: DataService, public lien: LienService) { }

  ngOnInit(): void { }

  donneesBrouillons = new dataToSend("", "", "");


  //PRISE DE L'IMAGE DU BROUILLON
  priseImageBrouillon(event: any) {
    this.donneesBrouillons.image = event.target.files[0]
    console.log(this.donneesBrouillons.image)
  }

  //ENREGISTRER UN BROUILLON
  submit(): void {
    console.log("a envoyer au serveur", this.donneesBrouillons)
    this.tout.insert(this.donneesBrouillons)
      .subscribe(
        (response) => {
          console.log("donnees bien inserees")
          window.location.reload()
        },
        (error) => console.log(error)
      )
  }


  //POSTER DIRECTEMENT
  poster(): void {
    console.log("a envoyer au serveur", this.donneesBrouillons)
    this.tout.makePost(this.donneesBrouillons)
      .subscribe(
        (response) => {

          console.log("post reussi")
          window.location.reload()

        },

        (error) => console.log("erreur lors de l'insersion")
      )
  }
}
