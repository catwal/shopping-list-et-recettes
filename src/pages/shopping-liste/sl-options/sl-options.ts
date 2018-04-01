/* pour un popover on a juste besoin du content 
c'est une page limitée - cette page fonctionne comme un modal*/
import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    selector: 'page-sl-options',
    template: `
    <ion-grid text-center>
     <ion-row> 
        <ion-col>
            <h3>Store & Load</h3>
         </ion-col>
        </ion-row>
     <ion-row>
        <ion-col>
        <button ion-button outline (click)="onAction('load')">Charger Liste</button>
        </ion-col>
     </ion-row>
     <ion-row>
        <ion-col>
        <button ion-button outline (click)="onAction('store')">Sauver Liste</button>
        </ion-col>
     </ion-row>
    </ion-grid>
    `
})
 
export class SlOptionsPage {
    constructor(private viewCtrl: ViewController) { }
    /* action c'est ou load ou store comme paramétré plus haut */
    onAction(action: string) {
        this.viewCtrl.dismiss({action: action});
    }
}