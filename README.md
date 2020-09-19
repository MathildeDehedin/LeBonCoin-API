# API Le Bon Coin

### _Languages_ & _Packages_

[Mongoose](https://www.npmjs.com/package/mongoose)
[Cloudinary](https://cloudinary.com/documentation/node_integration#node_js_getting_started_guide)
[Crypto-js](https://www.npmjs.com/package/crypto-js)
[uid2](https://github.com/coreh/uid2)

### - Créer un compte

#### **/user/sign_up** dans user.js

La route "/user/sign_up" permet de créer un nouvel utilisateur dans la BDD. On vérifie que l'email n'est pas déjà présent en BDD et que tous les paramètres (email, username, phone & password via un hash et un salt) sont envoyés afin de créer un compte.

```
{
    "email" : "pierre.dupont@yahoo.com",
    "username" : "pierre-dup",
    "phone" : "0678901234",
    "password" : "pierre-dup"
}
```

### - Se connecter

#### **/user/log_in** dans user.js

La route "/user/log_in" permet à l'utilisateur de se connecter. On vérifie d'abord que l'email et le password sont envoyés et que l'email est présent en BDD. Puis, on vérifie que le password renseigné correspond au password encrypté dans la BDD.

```
{
    "email" : "pierre.dupont@yahoo.com",
    "password" : "pierre-dup"
}
```

### - Publier une annonce

#### **/offer/publish** dans offer.js

La route "/offer/publish" permet de créer une nouvelle annonce en BDD qui sera liée à son utilisateur grâce à une référence. On vérifie que le titre, le prix, la description et une photo sont envoyés lors de la requête.

```
{
    "title" : "Voiture Peugeot 206",
    "price" : 4600,
    "description" : "Voiture seconde main, prix à débattre",
    "picture" : {}
}
```

### Modifier une annonce

#### **/offer/put** dans offer.js

La route "/offer/put" permet de modifier le contenu de l'annonce (titre, prix, description, photo) d'un utilisateur. L'utilisateur doit être enregistré afin de pouvoir la modifier

```
{
    "title" : "Peugeot 206",
}
```

```
{
    "price" : 5000,
    "description" : "Voiture seconde main, prix fixe"
}
```

### Supprimer une annonce

#### **/offer/delete** dans offer.js

La route "/offer/delete" permet de supprimer une annonce via son id. L'utilisateur doit également être enregistré pour supprimer l'annonce.

##### Trier les annonces

###### **/offer/with-count** dans offer.js

###### La route "/offer/with-count" permet d'obtenir toutes les annonces. Il est possible de les filtrer en recherchant par titre, par prix minimum et/ou maximum et de les trier par date (croissante ou ascendante) ou par prix (croissant ou décroissant).

##### Lire une annonce

###### **/offer/:id** dans offer.js

###### Cette route permet d'accèder à une seule annonce grâce à son id.
