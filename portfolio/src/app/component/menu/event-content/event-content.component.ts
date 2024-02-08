import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { Observable, map } from 'rxjs';
import { SearchService } from 'src/app/search.service';
import { FormsModule } from '@angular/forms';
import { receivedData } from '../../admin/receivedData.model';

@Component({
  selector: 'app-event-content',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.css']
})
export class EventContentComponent implements OnInit {
 
  posts$: Observable<any[]> | undefined;
  filteredPosts: any[] | undefined;
  searchTerm: string = '';
  listeEvent :receivedData[] = [];
  constructor(private dataService: DataService, private searchService: SearchService) {}

  ngOnInit() : void{
    this.dataService.displayPost()
    .subscribe(
      (response)=>{  
        for(let i = 0 ; i < response.length ; i++){
          this.listeEvent[i] = new receivedData(response[i].id_post,response[i].nom_post , response[i].description , response[i].nom_image , response[i].image_path ,response[i].date)
          this.listeEvent[i].absolute_path = "http://localhost:3000/"+this.listeEvent[i].path_img
          console.log("numero " + i + " = ")
          console.log(this.listeEvent[i])
        }
  
        for(let i = 0  ; i < this.listeEvent.length ; i++){
          this.listeEvent[i].absolute_path  = "http://localhost:3000/" +this.listeEvent[i].path_img
          console.log (this.listeEvent[i].path_img )
        }
       
      },
  
      (erreur) => {
        console.log("erreur d'affichage")
      }
    )
  }

  onSearch() {
    this.posts$ = this.dataService.getPosts().pipe(
      map(posts => posts.slice(0, 21)),
      map(posts => posts.filter(post =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      ))
    );
  }
}
