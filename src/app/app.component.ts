import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuClose, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/* import de firebase manuellement */
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  /* pour sidebar on a besoin de changer ce paramètre */
  /* tabsPage = TabsPage; */
  signinPage = SigninPage;
  signupPage = SignupPage;
  /* on met cet argument pour que ce soit cette page qui soit chargée en premier
  c'est elle qui va prendre en charge le navController */
  @ViewChild('nav') nav: NavController;
  isAuthenticated = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {
    /* dans le constructeur on initialise l'application avec firebase et les infos importantes de notre service firebase */
    firebase.initializeApp({
      apiKey: "AIzaSyBWYwEooKHBVmkxT1d_gQ-lJe_yQqS8I8E",
      authDomain: "ionic-http-oauth.firebaseapp.com"
    })
    /* changement de page selon si le user à pu s'authentifier ou pas */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        /* this.nav.setRoot(this.tabsPage); */
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        /*this.nav.setRoot(this.signinPage); */
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  /* on ne peut pas utiliser le navCtrl dans app.component car la page
  n'a pas initialement été chargée et mise en cache
  a la place faut mettre @ViewChild qui va gerer nav
  puis rajout de menuCtrl */
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  onLogOut() {
    this.authService.logOut();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

