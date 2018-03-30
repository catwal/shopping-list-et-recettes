import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Recette } from '../../models/recette';
import { EditRecettePage } from '../edit-recette/edit-recette';
import { ShoppingListeService } from '../../services/shopping.list.service';
import { RecetteService } from '../../services/recette.service';


@IonicPage()
@Component({
  selector: 'page-recette',
  templateUrl: 'recette.html',
})
export class RecettePage implements OnInit {
  recette: Recette;
  index: number;
  constructor(public navParams: NavParams, public navCtrl: NavController, private slService: ShoppingListeService, private recetteService: RecetteService) { }

  ngOnInit() {
    this.recette = this.navParams.get('recette');
    this.index = this.navParams.get('index');
    console.log(this.index, this.recette);
  }

  onAddIngredient() {
    this.slService.addItems(this.recette.ingredients);
  }
  onEditRecette() {
    this.navCtrl.push(EditRecettePage, { mode: 'Editer', recipe: this.recette, index: this.index });
  }
  onDeleteRecette() {
    this.recetteService.removeRecette(this.index);
    this.navCtrl.popToRoot();
  }
}
