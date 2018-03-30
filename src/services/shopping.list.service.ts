import { Ingredient } from "../models/ingredient";

export class ShoppingListeService {
    /* definition de ma propriété ingredients, qui est un tableau d'ingrédient et qui est au départ vide et dans mon constructeur j'ai les deux
    paramètres nécéssaires = nom, nombre qui sont définis*/
    private ingredients: Ingredient[] = [];

    /* dans les méthodes ont va toujours passer en paramètre les données qui vont être chargées */
    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    addItems(items: Ingredient[]){
        /* ... transforme un tableau en liste */
        this.ingredients.push(...items);
    }

    getItems(){
        /* slice permet d'avoir une copie du tableau et non l'objet tableau en lui même */
        return this.ingredients.slice();
    }
    removeItem(index: number){
        /* index est souvent utiliser pour les positions
        splice permet de supprimer */
        this.ingredients.splice(index, 1);
    }
}