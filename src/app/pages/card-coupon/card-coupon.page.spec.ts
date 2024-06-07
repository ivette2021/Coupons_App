import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardCouponPage } from './card-coupon.page';

describe('CardCouponPage', () => {
  let component: CardCouponPage;
  let fixture: ComponentFixture<CardCouponPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCouponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
