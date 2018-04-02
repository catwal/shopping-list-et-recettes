import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EditRecettePage } from '../pages/edit-recette/edit-recette';
import { RecettePage } from '../pages/recette/recette';
import { RecettesPage } from '../pages/recettes/recettes';
import { ShoppingListePage } from '../pages/shopping-liste/shopping-liste';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListeService } from '../services/shopping.list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecetteService } from '../services/recette.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { SlOptionsPage } from '../pages/shopping-liste/sl-options/sl-options';
/* pour que http marche il faut absolument le httpmodule! */
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    EditRecettePage,
    RecettePage,
    RecettesPage,
    ShoppingListePage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecettePage,
    RecettePage,
    RecettesPage,
    ShoppingListePage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptionsPage
  ],
  /* toujours rajouter le service dans le provider */
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShoppingListeService,
    RecetteService,
    AuthService
  ]
})
export class AppModule { }
