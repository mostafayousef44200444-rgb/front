import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cart: any = null;
  loading = true;

  // بيانات الشحن
  fullName = '';
  phone = '';
  city = '';
  street = '';
  country = '';
  paymentMethod: 'cash' | 'card' = 'cash';
  notes = '';

  submitting = false;
  message = '';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.orderService.getCurrentOrder().subscribe(res => {
      this.cart = res;
      this.loading = false;
    });
  }

  confirmOrder() {
    if (!this.fullName || !this.phone || !this.city || !this.street || !this.country || !this.paymentMethod) {
      this.message = "الرجاء ملء كل الحقول المطلوبة";
      return;
    }

    this.submitting = true;
    this.orderService.confirmOrder(this.cart._id, {
      fullName: this.fullName,
      phone: this.phone,
      city: this.city,
      street: this.street,
      country: this.country,
      paymentMethod: this.paymentMethod,
      notes: this.notes
    }).subscribe({
      next: res => {
        this.message = "تم تأكيد الطلب بنجاح!";
        this.submitting = false;
        // بعد التأكيد، إعادة التوجيه لصفحة الطلبات
        this.router.navigate(['/my-orders']);
      },
      error: err => {
        this.message = err.error?.message || 'حدث خطأ';
        this.submitting = false;
      }
    });
  }
}

