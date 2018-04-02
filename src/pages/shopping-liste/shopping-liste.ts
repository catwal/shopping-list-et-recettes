import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
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
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
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
    const loading = this.loadingCtrl.create({
      content: 'Veuillez patienter...'
    });
    /* comme pour le modal on a juste besoin de rajouter la page */
    const popoverCtrl = this.popoverCtrl.create(SlOptionsPage);
    popoverCtrl.present({ ev: event });
    popoverCtrl.onDidDismiss(
      data => {
        if (data.action == 'load') {
          /* présentation du loading quand popover disparait et que load data est en cours */
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (liste: Ingredient[]) => {
                      loading.dismiss();
                      if (liste) {
                        /* remplacement de l'ancienne par la nouvelle liste */
                        this.listItems = liste;
                        console.log('Succès!');
                      } else {
                        this.listItems = [];
                      } 
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.message);
                      console.log(error);
                    }
                  );
              });
        } else if (data.action == 'store') {
          loading.present();
          /* pour cas clique store = getToken va donner une promise token actif a a refresh */
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => /* console.log('Succès!'), */
                      loading.dismiss(),
                    error => {
                      /* rajout d'une méthode handler error car sinon je n'ai rien qui se passe si j'ai une erreur */
                      loading.dismiss();
                      this.handleError(error.message);
                      /* console.log(error); */
                    }
                  );
              });
        }

      }
    );
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Une erreur est survenue!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
