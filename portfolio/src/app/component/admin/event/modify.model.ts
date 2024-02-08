export class modify{
    id: number  = 0;
    nom : string;
    description : string ;
    image : File | null;
    date : Date 
    constructor(nom: string , description :string , date:string){
        this.nom = nom;
        this.description = description;
        this.image = null
        this.date = new Date(date)
    }
    
}