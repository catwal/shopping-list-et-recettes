import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';

/* pour avoir le constructeur et permettre les injections */
@Injectable()

export class ShoppingListeService {
    /* definition de ma propriété ingredients, qui est un tableau d'ingrédient et qui est au départ vide et dans mon constructeur j'ai les deux
    paramètres nécéssaires = nom, nombre qui sont définis*/
    private ingredients: Ingredient[] = [];


    constructor(private http: Http,
        private authSerive: AuthService) { }

    /* dans les méthodes ont va toujours passer en paramètre les données qui vont être chargées */
    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    addItems(items: Ingredient[]) {
        /* ... transforme un tableau en liste */
        this.ingredients.push(...items);
    }

    getItems() {
        /* slice permet d'avoir une copie du tableau et non l'objet tableau en lui même */
        return this.ingredients.slice();
    }
    removeItem(index: number) {
        /* index est souvent utiliser pour les positions
        splice permet de supprimer */
        this.ingredients.splice(index, 1);
    }
    /* envoi des données */
    storeList(token: string) {
        /* récupération dl'id unique du user 
        le nom du fichier peut etre n'importe quoi mais par contre toujours en json*/
        const userId = this.authSerive.getActiveUser().uid;
        /* création de la requette http  - notion de subscribe très importante en angular
        ici péfère le return pour l'instant - la réponse se fait toujours à travers
        la méthode .map() qui provient de rxjs et permet de transformer object java en objet json
        ! Response doit etre importée*/
        return this.http
            .put('https://ionic-http-oauth.firebaseio.com/' + userId + '/shopping-liste.json?auth=' + token, this.ingredients)
            .map((response: Response) => {
                return response.json();
            });
    }
    /* récupération des données */
    fetchList(token: string) {
        const userId = this.authSerive.getActiveUser().uid;
        return this.http
            .get('https://ionic-http-oauth.firebaseio.com/' + userId + '/shopping-liste.json?auth=' + token)
            .map((response: Response)=>{
                return response.json();
            })
            /* do permet d'utiliser les données en autre chose qu'avec méthode subscribe */
            .do((data)=>{
                this.ingredients = data
            });
    }
}