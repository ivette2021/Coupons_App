import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, duration = 5000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'top',
    });
    await toast.present();
  }
}
