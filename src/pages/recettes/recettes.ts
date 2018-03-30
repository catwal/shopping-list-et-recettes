import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EditRecettePage } from '../edit-recette/edit-recette';
import { Recette } from '../../models/recette';
import { RecetteService } from '../../services/recette.service';
import { RecettePage } from '../recette/recette';


@IonicPage()
@Component({
  selector: 'page-recettes',
  templateUrl: 'recettes.html',
})
export class RecettesPage {
  recettes: Recette[];

  constructor(private navCtrl: NavController, private recetteService: RecetteService) { }

  onNewRecette() {
    /* rajout 2eme argument car edit page va servir pour editer et pour creer une recette */
    this.navCtrl.push(EditRecettePage, { mode: 'Nouvelle' });
  }

  /* il va falloir initialiser la page et les données qui rentrent */
  ionViewWillEnter() {
    this.recettes = this.recetteService.getRecette();
  }
  /* injection des paramètres dans la méthode pour transferer à l'autre page, le navCtrl envoie des paramètre et de l'autre côté pour récupérér 
  on utilise navParam */
  onLoadRecette(recette: Recette, index: number) {
    this.navCtrl.push(RecettePage, {recette: recette, index: index});
  }
}
