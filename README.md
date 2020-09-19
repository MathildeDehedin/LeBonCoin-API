# API Le Bon Coin

### _Languages_ & _Packages_

[Mongoose](https://www.npmjs.com/package/mongoose) <br>
[Cloudinary](https://cloudinary.com/documentation/node_integration#node_js_getting_started_guide) <br>
[Crypto-js](https://www.npmjs.com/package/crypto-js)<br>
[uid2](https://github.com/coreh/uid2)<br>

### - Créer un compte

#### Route en post : **/user/sign_up** dans user.js

La route "/user/sign_up" permet de créer un nouvel utilisateur dans la BDD. On vérifie que l'email n'est pas déjà présent en BDD et que tous les paramètres (email, username, phone & password via un hash et un salt) sont envoyés afin de créer un compte. <br>

Exemple de requête :

```
{
    "email" : "pierre.dupont@yahoo.com",
    "username" : "pierre-dup",
    "phone" : "0678901234",
    "password" : "pierre-dup"
}
```

Réponse attendue de la requête :

```
{
    "_id": "5f65ecdd6a091004240ca957",
    "email": "pierre.dupont@yahoo.com",
    "token": "xZiEwe8ByeelpHK9",
    "account": {
        "username": "pierre-dup",
        "phone": "0678901234"
    }
}
```

### - Se connecter

#### Route en post : **/user/log_in** dans user.js

La route "/user/log_in" permet à l'utilisateur de se connecter. On vérifie d'abord que l'email et le password sont envoyés et que l'email est présent en BDD. Puis, on vérifie que le password renseigné correspond au password encrypté dans la BDD. <br>

Exemple de requête :

```
{
    "email" : "pierre.dupont@yahoo.com",
    "password" : "pierre-dup"
}
```

Réponse attendue de la requête :

```
{
    "_id": "5f65ecdd6a091004240ca957",
    "token": "xZiEwe8ByeelpHK9",
    "account": {
        "username": "pierre-dup",
        "phone": "0678901234"
    }
}
```

### - Publier une annonce

#### Route en post : **/offer/publish** dans offer.js

La route "/offer/publish" permet de créer une nouvelle annonce en BDD qui sera liée à son utilisateur grâce à une référence. On vérifie que le titre, le prix, la description et une photo sont envoyés lors de la requête. <br>

Exemple de requête :

```
{
    "title" : "Voiture Peugeot 206",
    "price" : 4600,
    "description" : "Voiture seconde main, prix à débattre",
    "picture" : {}
}
```

Réponse attendue de la requête :

```
{
    "_id": "5f65ee076a091004240ca959",
    "title": "Voiture Peugeot 206",
    "description": "Voiture seconde main",
    "price": 4600,
    "created": "2020-09-19T11:39:51.685Z",
    "creator": {
        "account": {
            "username": "pierre-dup",
            "phone": "0678901234"
        },
        "_id": "5f65ecdd6a091004240ca957"
    },
    "picture": {
        "asset_id": "ecded5ffa9ad6b3c0302ddf4ae58ca60",
        "public_id": "utauiltdn9i770qecijv",
        "version": 1600515591,
        "version_id": "f87ff30c93b40a674ac0500e5b3d5b53",
        "signature": "1f65fbe0c973ccaceb8bc17968f22fa714f66438",
        "width": 640,
        "height": 480,
        "format": "jpg",
        "resource_type": "image",
        "created_at": "2020-09-19T11:39:51Z",
        "tags": [],
        "bytes": 100009,
        "type": "upload",
        "etag": "a9b1d3ea6b5864bfb6b6bc32f77d5d69",
        "placeholder": false,
        "url": "http://res.cloudinary.com/dbxmpuzvk/image/upload/v1600515591/utauiltdn9i770qecijv.jpg",
        "secure_url": "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1600515591/utauiltdn9i770qecijv.jpg",
        "original_filename": "upload_14d7793fa2a2c0502dd51619c5b174b5"
    }
}
```

### - Modifier une annonce

#### Route en post : **/offer/put** dans offer.js

La route "/offer/put" permet de modifier le contenu de l'annonce (titre, prix, description, photo) d'un utilisateur. L'utilisateur doit être enregistré afin de pouvoir la modifier. <br>

Exemple de requête :

```
{
    "id" : "5f65ee076a091004240ca959",
    "title" : "Peugeot 206",
    "description" : "Voiture seconde main, prix fixe"
}
```

Réponse attendue de la requête :

```
{
    "_id": "5f65ee076a091004240ca959",
    "title": "Peugeot 206",
    "description": "Voiture seconde main, prix fixe",
    "price": 4600,
    "picture": {
        "asset_id": "ecded5ffa9ad6b3c0302ddf4ae58ca60",
        "public_id": "utauiltdn9i770qecijv",
        "version": 1600515591,
        "version_id": "f87ff30c93b40a674ac0500e5b3d5b53",
        "signature": "1f65fbe0c973ccaceb8bc17968f22fa714f66438",
        "width": 640,
        "height": 480,
        "format": "jpg",
        "resource_type": "image",
        "created_at": "2020-09-19T11:39:51Z",
        "tags": [],
        "bytes": 100009,
        "type": "upload",
        "etag": "a9b1d3ea6b5864bfb6b6bc32f77d5d69",
        "placeholder": false,
        "url": "http://res.cloudinary.com/dbxmpuzvk/image/upload/v1600515591/utauiltdn9i770qecijv.jpg",
        "secure_url": "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1600515591/utauiltdn9i770qecijv.jpg",
        "original_filename": "upload_14d7793fa2a2c0502dd51619c5b174b5"
    },
    "creator": "5f65ecdd6a091004240ca957",
    "created": "2020-09-19T11:39:51.685Z",
    "__v": 0
}
```

### - Supprimer une annonce

#### Route en post : **/offer/delete** dans offer.js

La route "/offer/delete" permet de supprimer une annonce via son id. L'utilisateur doit également être enregistré pour supprimer l'annonce. <br>

Exemple de requête :

```
{
    "id" : "5f65ee076a091004240ca959"
}
```

Réponse attendue de la requête :

```
{
    "message": "Offer deleted"
}
```

### - Trier les annonces

#### Route en get : **/offer/with-count** dans offer.js

La route "/offer/with-count" permet d'obtenir toutes les annonces. Il est possible de les filtrer en recherchant par titre, par prix minimum et/ou maximum et de les trier par date (croissante ou ascendante) ou par prix (croissant ou décroissant). <br>

Exemple de requête sur Postamn :
http://localhost:3000/offer/with-count?title=ordinateur

Réponse attendue de la requête :

```
{
    "count": 13,
    "offre": [
        {
            "_id": "5f087a45bbfccf1ad9d4317f",
            "title": "Canapé gris angle 4 personnes",
            "description": "Canapé d'angle bon état général",
            "price": 740,
            "picture": {
                "asset_id": "4f4e1e8b1861b1faa5c8487a29a862d0",
                "public_id": "nbbu7ytzqovlctcyuacg",
                "version": 1594391109,
                "version_id": "567a539b956993df40b2a9b1204e1a95",
                "signature": "eca563569ddbf827f95cd0ac61104b146d36f40d",
                "width": 500,
                "height": 500,
                "format": "jpg",
                "resource_type": "image",
                "created_at": "2020-07-10T14:25:09Z",
                "tags": [],
                "bytes": 8916,
                "type": "upload",
                "etag": "8bcd1e8e5430f32a3939178278717998",
                "placeholder": false,
                "url": "http://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391109/nbbu7ytzqovlctcyuacg.jpg",
                "secure_url": "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391109/nbbu7ytzqovlctcyuacg.jpg",
                "original_filename": "upload_127390c39c8902e2fb4c4912fc6880ba"
            },
            "creator": {
                "account": {
                    "username": "Antoine",
                    "phone": "0606060606"
                },
                "_id": "5f086eef821db819e9d7c18b"
            },
            "created": "2020-07-10T14:25:09.757Z",
            "__v": 0
        },
        {
            "_id": "5f087b246fdebe1ae947cf40",
            "title": "Ordinateur portable MacBook ",
            "description": "Ordinateur marque apple, état neuf",
            "price": 1200,
            "picture": {
                "asset_id": "54ec209388242e1d47210e4e1af29bb6",
                "public_id": "ezcyicy7zcrwza23ggds",
                "version": 1594391331,
                "version_id": "88776dd8c62e8bd7622535151aa47bba",
                "signature": "d35238d3685f856efc6be92b82cf8fa7fd7c3d0e",
                "width": 892,
                "height": 820,
                "format": "jpg",
                "resource_type": "image",
                "created_at": "2020-07-10T14:28:51Z",
                "tags": [],
                "bytes": 75876,
                "type": "upload",
                "etag": "dacf3e5285aeacaa9e6d5ba31577a355",
                "placeholder": false,
                "url": "http://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391331/ezcyicy7zcrwza23ggds.jpg",
                "secure_url": "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391331/ezcyicy7zcrwza23ggds.jpg",
                "original_filename": "upload_7e58371c6a81611b4c260ddf7e886ee9"
            },
            "creator": {
                "account": {
                    "username": "Thomas",
                    "phone": "0606060606"
                },
                "_id": "5f086f12821db819e9d7c18c"
            },
            "created": "2020-07-10T14:28:52.376Z",
            "__v": 0
        },
        {
            "_id": "5f087b5a6fdebe1ae947cf41",
            "title": "Vélo spiderman",
            "description": "Vélo enfant logoypé spiderman avec roulettes",
            "price": 30,
            "picture": {
                "asset_id": "2bbed10762bf1a812d5f8e523ccdaeac",
                "public_id": "ftmwdregq9qwkudtmdyb",
                "version": 1594391385,
                "version_id": "e8441ec2a352f0fbef1299c41bc9f582",
                "signature": "e45a24004704e00ffad8aa0b4254d8ca22b1cb76",
                "width": 300,
                "height": 300,
                "format": "jpg",
                "resource_type": "image",
                "created_at": "2020-07-10T14:29:45Z",
                "tags": [],
                "bytes": 14393,
                "type": "upload",
                "etag": "683902e5203dfeca5fb04d48594f7adf",
                "placeholder": false,
                "url": "http://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391385/ftmwdregq9qwkudtmdyb.jpg",
                "secure_url": "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391385/ftmwdregq9qwkudtmdyb.jpg",
                "original_filename": "upload_9322a149443304bbf8d3f701598b3062"
            },
            "creator": {
                "account": {
                    "username": "Marion",
                    "phone": "0606060606"
                },
                "_id": "5f086f12821db819e9d7c18c"
            },
            "created": "2020-07-10T14:29:46.237Z",
            "__v": 0
        },
}
```

<br>

Exemple de requête sur Postman :
http://localhost:3000/offer/with-count?title=ordinateur

Réponse attendue de la requête :

```
{
    "count": 1,
    "offre": [
        {
            "_id": "5f087b246fdebe1ae947cf40",
            "title": "Ordinateur portable MacBook ",
            "description": "Ordinateur marque apple, état neuf",
            "price": 1200,
            "picture": {
                "asset_id": "54ec209388242e1d47210e4e1af29bb6",
                "public_id": "ezcyicy7zcrwza23ggds",
                "version": 1594391331,
                "version_id": "88776dd8c62e8bd7622535151aa47bba",
                "signature": "d35238d3685f856efc6be92b82cf8fa7fd7c3d0e",
                "width": 892,
                "height": 820,
                "format": "jpg",
                "resource_type": "image",
                "created_at": "2020-07-10T14:28:51Z",
                "tags": [],
                "bytes": 75876,
                "type": "upload",
                "etag": "dacf3e5285aeacaa9e6d5ba31577a355",
                "placeholder": false,
                "url": "http://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391331/ezcyicy7zcrwza23ggds.jpg",
                "secure_url": "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391331/ezcyicy7zcrwza23ggds.jpg",
                "original_filename": "upload_7e58371c6a81611b4c260ddf7e886ee9"
            },
            "creator": {
                "account": {
                    "username": "Thomas",
                    "phone": "0606060606"
                },
                "_id": "5f086f12821db819e9d7c18c"
            },
            "created": "2020-07-10T14:28:52.376Z",
            "__v": 0
        }
    ]
}
```

### - Lire une annonce

#### Route en get : **/offer/:id** dans offer.js

Cette route permet d'accèder à une seule annonce grâce à son id. <br>

Exemple de requête sur Postman :
http://localhost:3000/offer/5f087d99e652391b1f3d1511

Réponse attendue de la requête :

```
{
    "count": 1,
    "offre": [
        {
            "_id": "5f087b246fdebe1ae947cf40",
            "title": "Ordinateur portable MacBook ",
            "description": "Ordinateur marque apple, état neuf",
            "price": 1200,
            "picture": {
                "asset_id": "54ec209388242e1d47210e4e1af29bb6",
                "public_id": "ezcyicy7zcrwza23ggds",
                "version": 1594391331,
                "version_id": "88776dd8c62e8bd7622535151aa47bba",
                "signature": "d35238d3685f856efc6be92b82cf8fa7fd7c3d0e",
                "width": 892,
                "height": 820,
                "format": "jpg",
                "resource_type": "image",
                "created_at": "2020-07-10T14:28:51Z",
                "tags": [],
                "bytes": 75876,
                "type": "upload",
                "etag": "dacf3e5285aeacaa9e6d5ba31577a355",
                "placeholder": false,
                "url": "http://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391331/ezcyicy7zcrwza23ggds.jpg",
                "secure_url": "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1594391331/ezcyicy7zcrwza23ggds.jpg",
                "original_filename": "upload_7e58371c6a81611b4c260ddf7e886ee9"
            },
            "creator": {
                "account": {
                    "username": "Thomas",
                    "phone": "0606060606"
                },
                "_id": "5f086f12821db819e9d7c18c"
            },
            "created": "2020-07-10T14:28:52.376Z",
            "__v": 0
        }
    ]
}
```
