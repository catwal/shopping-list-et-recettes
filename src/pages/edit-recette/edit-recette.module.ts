import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRecettePage } from './edit-recette';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EditRecettePage,
  ],
  imports: [
    IonicPageModule.forChild(EditRecettePage),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class EditRecettePageModule {}
