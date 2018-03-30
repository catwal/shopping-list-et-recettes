import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListeService } from '../../services/shopping.list.service';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-liste',
  templateUrl: 'shopping-liste.html',
})
export class ShoppingListePage {
  /* ici la propriété est déclarée mais elle n'apparait toujours pas puisque vide */
  listItems: Ingredient[];
  /* injecter le service dans le constructeur */
  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListeService) {
  }

  /* les infos n'apparaissent pas en simultanées puisqu'elles restent dans le cache */
  ionViewWillEnter() {
    /* listItems va être remplie par la méthode de récuperation des items qui est déclarée dans service */
    //this.listItems = this.slService.getItems();
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientNom, form.value.ingredientNombre);
    form.reset();
    this.loadItems();
    console.log(form);
  }
  /* méthode privée pour permettre le chargement des infos */
  private loadItems() {
    /* listItems va être remplie par la méthode de récuperation des items qui est déclarée dans service */
    this.listItems = this.slService.getItems();
  }
  
  onRemoveItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();
  }
  
}
