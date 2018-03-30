import { Ingredient } from "./ingredient";

export class Recette {
    constructor(public titre: string, public description: string, public difficulte: string, public ingredients: Ingredient[]) { }
}