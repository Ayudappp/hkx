import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {ShowService} from '../../providers/show-service-rest';
import {SERVER_URL} from '../../providers/config';

@Component({
    selector: 'page-show-detail',
    templateUrl: 'show-detail.html'
})
export class ShowDetailPage {

    show: any;
    serverUrl: string = SERVER_URL;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public ShowService: ShowService, public toastCtrl: ToastController) {
        this.show = this.navParams.data;
        ShowService.findById(this.show.id).then(
            show => this.show = show
        );
    }

    favorite(show) {
        this.ShowService.favorite(show)
            .then(show => {
                let toast = this.toastCtrl.create({
                    message: 'Candidature envoyée',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    unfavorite(show) {
        this.ShowService.unfavorite(show)
            .then(show => {
                let toast = this.toastCtrl.create({
                    message: 'Candidature retirée !',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    canFavorite(show) {
        return this.ShowService.canFavorite(show);
    }

    share(show) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Partager avec ses amis',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('Partager via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('Partager via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('Partager via email')
                },
                {
                    text: 'Revenir',
                    role: 'cancel',
                    handler: () => console.log('Revenir')
                }
            ]
        });

        actionSheet.present();
    }

}
