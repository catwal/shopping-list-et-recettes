import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListeService } from '../../services/shopping.list.service';
import { Ingredient } from '../../models/ingredient';
import { SlOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-shopping-liste',
  templateUrl: 'shopping-liste.html',
})
export class ShoppingListePage {
  /* ici la propriété est déclarée mais elle n'apparait toujours pas puisque vide */
  listItems: Ingredient[];
  /* injecter le service dans le constructeur */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListeService,
    private popoverCtrl: PopoverController,
    private authService: AuthService) {
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

  onRemoveItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }
  /* pour que le popover soit bien positionner il faut lui passer un event JS 
  le mousevent va donner les coordonnées ou doit s'ouvire le popover*/
  onShowOption(event: MouseEvent) {
    /* comme pour le modal on a juste besoin de rajouter la page */
    const popoverCtrl = this.popoverCtrl.create(SlOptionsPage);
    popoverCtrl.present({ ev: event });
    popoverCtrl.onDidDismiss(
      data => {
        if (data.action == 'load') {
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (liste: Ingredient[]) => {
                      if (liste) {
                        /* remplacement de l'ancienne par la nouvelle liste */
                        this.listItems = liste;
                        console.log('Succès!');
                      } else {
                        this.listItems = [];
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );
              });
        } else {
          /* pour cas clique store = getToken va donner une promise token actif a a refresh */
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => console.log('Succès!'),
                    error => {
                      console.log(error);
                    }
                  );
              });
        }

      }
    );
  }
}
