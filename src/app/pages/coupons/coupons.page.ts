import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Coupon } from 'src/app/models/coupons';
import { CouponsService } from 'src/app/services/coupons.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
  public couponsActive: boolean;
  public showCamera: boolean;
  public coupons: Coupon[];

  constructor(
    private couponsService: CouponsService,
    private navParams: NavParams,
    private navController: NavController,
    private alertController: AlertController,
    private toastService: ToastService
  ) {
    this.coupons = [];
    this.couponsActive = false;
    this.showCamera = false;
  }

  ngOnInit() {
    this.couponsService.getCoupons().then((coupons: Coupon[]) => {
      this.coupons = coupons;
      console.log(this.coupons);
    });
  }

  changeActive(coupon: Coupon) {
    coupon.active = !coupon.active;
    this.couponsActive = this.coupons.some((c) => c.active);
  }

  goToCard() {
    this.navParams.data['coupons'] = this.coupons.filter((c) => c.active);
    this.navController.navigateForward('card-coupon');
  }
  async startCamera() {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    const perms = await BarcodeScanner.checkPermission({ force: true });

    if (perms.granted) {
      this.showCamera = true;

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content

        try {
          let coupon: Coupon = JSON.parse(result.content);

          if (this.isCouponValid(coupon)) {
            this.toastService.showToast('QR escaneado correctamente');
            this.coupons.push(coupon);
          } else {
            this.toastService.showToast('QR error');
          }
        } catch (error) {
          console.error(error);
        }
      }

      this.closeCamera();
    } else {
      const alert = await this.alertController.create({
        message: 'Esta app necesita permisos en la camara para funcionar',
      });
      await alert.present();
    }
  }
  closeCamera() {
    this.showCamera = false;
    BarcodeScanner.stopScan();
  }
  private isCouponValid(coupon: Coupon) {
    return (
      coupon &&
      coupon.id_product &&
      coupon.img &&
      coupon.name &&
      coupon.discount
    );
  }
}
