import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardCouponPageRoutingModule } from './card-coupon-routing.module';

import { CardCouponPage } from './card-coupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardCouponPageRoutingModule
  ],
  declarations: [CardCouponPage]
})
export class CardCouponPageModule {}
