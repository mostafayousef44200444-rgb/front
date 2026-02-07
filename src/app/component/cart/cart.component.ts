import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, CartItem } from '../../../services/order.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any = null;
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.orderService.getCurrentOrder().subscribe(res => {
      this.cart = res;
      this.loading = false;
    });
  }

  remove(item: CartItem) {
    this.orderService.removeItemFromCart(item.productId).subscribe({
      next: (res: any) => {
        this.cart = res;
      },
      error: (err) => console.error('Error removing item:', err)
    });
  }

  increase(item: CartItem) {
    this.orderService.updateProductQuantity(this.cart._id, item.productId, item.quantity + 1).subscribe({
      next: (res) => this.cart = res,
      error: (err) => console.error(err)
    });
  }

  decrease(item: CartItem) {
    if (item.quantity <= 1) return;
    this.orderService.updateProductQuantity(this.cart._id, item.productId, item.quantity - 1).subscribe({
      next: (res) => this.cart = res,
      error: (err) => console.error(err)
    });
  }

  get total(): number {
    return this.cart?.items?.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0) || 0;
  }
}
