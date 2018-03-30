import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecettePage } from './recette';

@NgModule({
  declarations: [
    RecettePage,
  ],
  imports: [
    IonicPageModule.forChild(RecettePage),
  ],
})
export class RecettePageModule {}
