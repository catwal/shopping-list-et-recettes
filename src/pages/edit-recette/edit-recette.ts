.import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecetteService } from '../../services/recette.service';
import { Recette } from '../../models/recette';


@IonicPage()
@Component({
  selector: 'page-edit-recette',
  templateUrl: 'edit-recette.html',
})
export class EditRecettePage implements OnInit {
  mode = 'Nouvelle';
  selectOptions = ['Facile', 'Moyenne', 'Difficile'];
  recetteForm: FormGroup;
  recette: Recette;
  index: number;

  /* ajout de formsModule pour faire marcher le select - à verifier */
  constructor(private navParams: NavParams, private actionSheetController: ActionSheetController, private alertCtrl: AlertController,
    private toastCtrl: ToastController, private recetteService: RecetteService, private navCtrl: NavController) { }

  ngOnInit() {
    /* le ngoninit va d'abord se lancer sur le mode New defini dans recettes */
    this.mode = this.navParams.get('mode');
    /* defintion du type de mode a montrer */
    if (this.mode == 'Editer') {
      this.recette = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }
  /* 1ere partie = creation de la forme réactive - en entrant les données, construction dynamique des infos recette */
  //private initializeForm() {
  /* initializeForm sert pour edit et new recette donc des valeurs par défaut ne sont pas bonnes */
  //this.recetteForm = new FormGroup({
  /* pas de valeur par defaut pour les 2 1ers et champs requis */
  //'titre': new FormControl(null, Validators.required),
  //'description': new FormControl(null, Validators.required),
  //'difficulte': new FormControl('Moyenne', Validators.required),
  //'ingredients': new FormArray([])
  //});
  /* 2eme partie =  variable pour si création et valeur par defaut si edition*/
  private initializeForm() {
    let titre = null;
    let description = null;
    let difficulte = 'Moyenne';
    let ingredients = [];

    if (this.mode == 'Editer') {
      titre = this.recette.titre;
      description = this.recette.description;
      difficulte = this.recette.difficulte;
      for (let ingredient of this.recette.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    /* initializeForm sert pour edit et new recette donc des valeurs par défaut ne sont pas bonnes */
    this.recetteForm = new FormGroup({
      'titre': new FormControl(titre, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulte': new FormControl(difficulte, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
  onSubmit() {
    /* recupération des valeurs inserées par le recetteForm */
    const value = this.recetteForm.value;
    /* comme ingrédients est un tableau on doit le retravailler */
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 1 };
      });

    }
    /* rajout de si mode editer et conservation des modifications */
    if (this.mode == 'Editer') {
      this.recetteService.updateRecette(this.index, value.titre, value.description, value.difficulte, ingredients);
    } else {
      /* insertion de toutes les valeurs dans la méthode - elle attend tous les paramètres */
      this.recetteService.addRecette(value.titre, value.description, value.difficulte, ingredients);
    }
    this.recetteForm.reset();
    this.navCtrl.popToRoot();
    console.log(this.recetteForm);
  }
  /* ajout d'une fenetre partant du bas du tel */
  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'Que voulez-vous faire?',
      buttons: [
        {
          text: 'Ajouter un ingrédient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Supprimer tous les ingrédients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recetteForm.get('ingredients');
            const length = fArray.length;
            if (length > 0) {
              for (let i = length - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'Tous les ingrédients ont été supprimés',
                duration: 1000
              });
              toast.present();
            }
          }
        }, {
          text: 'Annuler',
          role: 'cancel'
        }
      ]

    });
    actionSheet.present();
  }
  /* ajout d'une fenetre popup - alert -pour gerer l'ajout d'un nouveau ingrédient rajout dans méthode initialize d'un tableau */
  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Ajout d\'un ingrédient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nom'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Ajouter',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              /* insertion ici du toastCtrl, c'est un petit message alerte qui disparait au bout de quelques sec */
              const toast = this.toastCtrl.create({
                message: 'Entrez une valeure valide',
                duration: 1000,
                position: 'top' /* bottom est la valeure par défaut */
              });
              toast.present();
              return;
            }
            /* doit dire explicitement que cette partie <=> a une forme avec tableau */
            (<FormArray>this.recetteForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Ingrédient ajouté',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }
}
