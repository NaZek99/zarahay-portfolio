let { Client } = require('pg');
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs')
let cors = require('cors');
let { restart } = require('nodemon');
let app = express();
let multer = require('multer');
let upload = multer({ dest: 'images/' })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
app.use('/images', express.static('images'));


let port = 3000;


//INITIALISATION DE LA CONNEXION A LA BASE DE DONNEES
let client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'antonio',
    password: 'admin',
    database: 'activite',
});

client.connect();
//METHODE POUR INSERER UN BROUILLON
app.post("/insererbrouillon", upload.single("image"), async (req, res) => {
    let formData = req.body;
    let fichier = req.file;
    try {
        let insertImage = "insert into brouillon_image (image_path,nom_image,id_brouillon) values ($1,$2,$3)"
        let insertText = "insert into brouillon (nom,description,date) values ($1,$2,$3) returning id_brouillon  "

        //INSERTION DANS LA TABLE BROUILLON
        await client.query(insertText, [formData.nom, formData.description, formData.date], async (err, resultat) => {
            if (err) {
                console.error(err)
            }


            //INSERTION DANS LA TABLE BROUILLON_IMAGE
            let id_brouillon = resultat.rows[0].id_brouillon


            await client.query(insertImage, [fichier.path, fichier.originalname, id_brouillon], (err, resultat) => {
                if (err) {
                    console.error(err)
                }
                else {
                    res.status(200).json("voila")
                }
            })
        });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//AFFICHAGE DE LA LISTE DE TOUS BROUILLONS
app.get("/afficherbrouillon", async (req, res) => {
    let request = "select * from brouillon join brouillon_image on brouillon.id_brouillon = brouillon_image.id_brouillon;"
    try {
        let liste = await client.query(request);
        res.status(200).json(liste.rows);
    }

    catch (erreur) {
        res.status(501).send('erreur lors de la prise de donnees')
        console.error(erreur)
    }
})

//AFFICHAGE DES TROIS DERNIERS BROUILLONS

app.get("/troisBrouillons", async (req, res) => {
    let request = "SELECT brouillon.*, brouillon_image.* FROM brouillon JOIN brouillon_image ON brouillon.id_brouillon = brouillon_image.id_brouillon ORDER BY brouillon.id_brouillon DESC LIMIT 3;"
    try {
        let liste = await client.query(request);

        res.status(200).json(liste.rows);
    }

    catch (erreur) {
        res.status(501).send('erreur lors de la prise de donnees des trois historiques')
        console.error(erreur)
    }
})

//SUPPRIMMER UN BROUILLON
app.post('/supprimerBrouillon', async (req, res) => {
    let elementasuppr = req.body;
    let deleteRequest = "delete from brouillon where id_brouillon = $1";

    try {
        await fs.unlink(elementasuppr.path_img, async (supprerreur) => {
            if (supprerreur) {
                console.log("erreur de suppression")
                res.status(500).json("erreur de suppresion")
            }

            else {
                try {
                    await client.query(deleteRequest, [elementasuppr.id])
                    console.log("suppression reussie")
                    res.status(200).json("suppression reussie")
                }
                catch (err) {
                    console.log("erreur de suppression de donnees ")
                    res.status(500).json("erreur de suppresion de donnes")
                }
            }

        })
    }
    catch (err) {
        console.log("aussi erreur de suppression d'image")
        res.status(500).json("erreur de suppresion")
    }



});



//POSTER UN BROUILLON
app.post("/posterBrouillon", async (req, response) => {
    brouillon = req.body;

    let request1 = `
    insert into post (nom_post,description,date) 
         values(
             (select nom date from brouillon where id_brouillon = $1),
             (select description from brouillon where id_brouillon = $1),
             (select date from brouillon where id_brouillon =$1)
             );
    `
    let request2 = `
    insert into image_post (image_path , nom_image, id_post) 
    values(
       (select image_path from brouillon_image where id_brouillon = $1),
       (select nom_image from brouillon_image where id_brouillon = $1),
       (select id_post from post order by id_post desc limit 1)
    );
    `

    let request3 = `
    delete from brouillon where id_brouillon = $1;
    `
    try {
        await client.query(request1, [brouillon.id], async (error1, results) => {
            if (error1) {
                console.log("error1");
                response.status(500).json(error1)
            }
            else {
                try {
                    await client.query(request2, [brouillon.id], async (error2, results2) => {
                        if (error2) {
                            console.log("error2")
                            response.status(500).json(error2)
                        }

                        else {
                            await client.query(request3, [brouillon.id], (error3, results3) => {
                                if (error3) {
                                    console.log("erreur3");
                                    response.status(500).json(error3)
                                }
                                else {
                                    console.log("transfert termine");
                                    response.status(200).json("transfert reussi")
                                }
                            })
                        }
                    })
                }
                catch (error) {
                    console.log("erreur a la deuxieme requete")
                    response.status(500).json(error)
                }
            }
        })
    }

    catch (err) {
        console.log("erreur de base de donnees");
        response.status(500).json("echec");
    }

})

//MODIFIER UN BROUILLON
app.post("/modifierBrouillon", upload.single("image"), async (req, response) => {
    brouillon = req.body
    fichier = req.file

    console.log(brouillon.date)
    let withFileRequest1 = `
   
   update brouillon 
   set nom = $1,
    description = $2,
    date= $3
   where id_brouillon = $4;
   
   `
    let withFileRequest2 = `
   update brouillon_image
   set image_path = $1,
    nom_image = $2
    where id_brouillon = $3;
   `
    let selectFilePath = 'select * from brouillon_image where id_brouillon = $1;'

    if (fichier) {
        await client.query(selectFilePath, [brouillon.id], (selectError, SelectResult) => {
            if (selectError) {
                console.log("erreur de selection")
                response.status(500).json("erreur de selection ")
            }
            else {
                console.log(SelectResult.rows[0].image_path)
                fs.unlink(SelectResult.rows[0].image_path, async (unlinkError) => {
                    if (unlinkError) {
                        console.log("erreur de suppression du fichier")
                        response.status(500).json("erreur de suppression du fichier")
                    }
                    else {
                        console.log("suppresion reussie")
                        await client.query(withFileRequest1, [brouillon.nom, brouillon.description, brouillon.date, brouillon.id], async (querryError, querryResult) => {
                            if (querryError) {
                                console.log(querryError)
                                response.status(500).json("erreur de l'update")
                            }
                            else {
                                console.log("premiere modification reussie")
                                await client.query(withFileRequest2, [fichier.path, fichier.originalname, brouillon.id], (queryError2, queryResult2) => {
                                    if (queryError2) {
                                        console.log(queryError2)
                                        response.status(500).json("erreur d'insertion du chemin image")
                                    }
                                    else {
                                        console.log("deuxieme modification reussie ")
                                        console.log("modification termine")
                                        response.status(200).json("modification reussie")
                                    }
                                })
                            }
                        })

                    }
                })
            }
        })
    }
    else {
        await client.query(withFileRequest1, [brouillon.nom, brouillon.description, brouillon.date, brouillon.id], async (querryError, querryResult) => {
            if (querryError) {
                console.log(querryError)
                response.status(500).json("erreur de l'update")
            }
            else {
                console.log("update reussi")
                response.status(200).json("update reussi")
            }
        })

    }
})

//METHODE POUR FAIRE UN POST
app.post("/poster", upload.single("image"), async (req, res) => {
    let formData = req.body;
    let fichier = req.file

    try {
        let insertImage = "insert into image_post(image_path,nom_image,id_post) values ($1,$2,$3)"
        let insertText = "insert into post (nom_post,description,date) values ($1,$2,$3) returning id_post"

        //INSERTION DANS LA TABLE post
        await client.query(insertText, [formData.nom, formData.description, formData.date], async (err, resultat) => {
            if (err) {
                console.error(err)
            }


            //INSERTION DANS LA TABLE Image_post
            let id_post = resultat.rows[0].id_post
            console.log(id_post)

            await client.query(insertImage, [fichier.path, fichier.originalname, id_post], (err, resultat) => {
                if (err) {
                    console.error(err)
                }
            })
        });

        console.log("voila")
        res.status(200).json("voila")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//AFFICHAGE DE TOUS LES EVENENMENTS
app.get("/afficherEvent", async (req, res) => {
    let request = "select * from post  join image_post on post.id_post = image_post.id_post;"
    try {
        let liste = await client.query(request);
        res.status(200).json(liste.rows);
    }

    catch (erreur) {
        res.status(501).send('erreur lors de la prise de donnees')
        console.error(erreur)
    }
})

//AFFICHAGE DES TROIS DERNIERS EVENEMENTS
app.get("/troisEvents", async (req, res) => {
    let request = "SELECT post.*, image_post.* FROM post JOIN image_post ON post.id_post= image_post.id_post ORDER BY post.id_post DESC LIMIT 3;"
    try {
        let liste = await client.query(request);
        res.status(200).json(liste.rows);
    }

    catch (erreur) {
        res.status(501).send('erreur lors de la prise de donnees des trois  historiques d evenment')
        console.error(erreur)
    }
})



//initialisation du serveur
let server = app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port : ${port}`);
});
//QUITTE LA BASE DE DONNES PENDANT LA DECONNEXION DU SERVEUR
server.on('close', () => {

    client.end();
});