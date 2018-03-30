import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ShoppingListePage } from '../shopping-liste/shopping-liste';
import { RecettesPage } from '../recettes/recettes';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
slPage = ShoppingListePage;
recettesPage = RecettesPage
;

}
