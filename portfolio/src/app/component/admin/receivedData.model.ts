//CLASSE DES DONNES RECUES DE PUIS LE SERVEUR ET A AFFICHER SUR LE FRONT

export class receivedData{
    nom : string ;
    description : string;
    nom_img : string;
    path_img :string;
    absolute_path : string = ''
    id : number;
    date : Date
    termine : boolean = false;
    visible : boolean = true
    constructor( id : number , nom : string , description : string , nom_img : string , path_img : string , date : string){
        this.nom = nom;
        this.description = description;
        this.path_img = path_img;
        this.nom_img = nom_img;
        this.id = id
        this.date = new Date(date)
        this.verifierFin()
    }


//METHODE DE VERIFICATION SI UN EVENEMENT EST TERMINE
    verifierFin(){
     let   maintenant: Date = new Date()
        this.termine = this.date < maintenant 
        console.log(this.termine)
    }
}