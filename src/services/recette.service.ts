import { Recette } from "../models/recette";
import { Ingredient } from "../models/ingredient";


export class RecetteService {
    private recettes: Recette[] = [];

    addRecette(titre: string, description: string, difficulte: string, ingredients: Ingredient[]) {
        this.recettes.push(new Recette(titre, description, difficulte, ingredients));
        console.log(this.recettes);
    }

    updateRecette(index: number, titre: string, description: string, difficulte: string, ingredients: Ingredient[]) {
        this.recettes[index] = new Recette(titre, description, difficulte, ingredients);
    }

    getRecette() {
        return this.recettes.slice();
    }

    removeRecette(index: number) {
        this.recettes.splice(index, 1);
    }

}