## API Le Bon Coin

### Made with _Node.js_, _MongoDB_, _Cloudinary_

##### Créer un compte

###### **/user/sign_up** dans user.js

###### La route "/user/sign_up" permet de créer un nouvel utilisateur dans la BDD. On vérifie que l'email n'est pas déjà présent en BDD et que tous les paramètres (email, username, phone & password via un hash et un salt) sont envoyés afin de créer un compte.

##### Se connecter

###### **/user/log_in** dans user.js

###### La route "/user/log_in" permet à l'utilisateur de se connecter. On vérifie d'abord que l'email et le password sont envoyés et que l'email est présent en BDD. Puis, on vérifie que le password renseigné correspond au password encrypté dans la BDD.

##### Publier une annonce

###### **/offer/publish** dans offer.js

###### La route "/offer/publish" permet de créer une nouvelle annonce en BDD qui sera liée à un utilisateur grâce à une référence. On vérifie que le titre, le prix, la description et une photo sont envoyés lors de la requête.

##### Modifier une annonce

###### **/offer/put** dans offer.js

###### La route "/offer/put" permet de modifier le contenu de l'annonce (titre, prix, description, photo) d'un utilisateur. L'utilisateur doit être enregistré afin de pouvoir la modifier

##### Supprimer une annonce

###### **/offer/delete** dans offer.js

###### La route "/offer/delete" permet de supprimer une annonce via son id. L'utilistaeur doit également être enregistré pour supprimer l'annonce.

##### Trier les annonces

###### **/offer/with-count** dans offer.js

###### La route "/offer/with-count" permet d'obtenir toutes les annonces. Il est possible de filtrer ces annonces en faisant une recherche par titre, par prix minimum et/ou maximum. Il est possible de trier ces dernières par date (croissante ou ascendante) ou par prix (croissant ou décroissant).

##### Lire une annonce

###### **/offer/:id** dans offer.js

###### Cette route permet d'accèder à une seul annonce grâce à son id.
