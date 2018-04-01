import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  onSignup(form: NgForm) {
    /* présentation du loading - mais faut penser à l'arreter à un moment */
    const loading = this.loadingCtrl.create({
      content: 'Enregistrement en cours...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        console.log(data)
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Erreur d\'enregistrement',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
        console.log(error)
      });
    console.log(form.value);
  }
}
