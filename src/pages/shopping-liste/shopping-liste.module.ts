import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListePage } from './shopping-liste';

@NgModule({
  declarations: [
    ShoppingListePage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListePage),
  ],
})
export class ShoppingListePageModule {}
