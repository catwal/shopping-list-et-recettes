import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecettesPage } from './recettes';

@NgModule({
  declarations: [
    RecettesPage,
  ],
  imports: [
    IonicPageModule.forChild(RecettesPage),
  ],
})
export class RecettesPageModule {}
