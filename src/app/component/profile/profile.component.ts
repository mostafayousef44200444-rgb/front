import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../services/auth.service';
import { OrderService, Order } from '../../../services/order.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  orders: Order[] = [];
  activeTab = 'dashboard';
  totalSpent = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = this.auth.currentUser;
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: Order[]) => {
        // ترتيب الطلبات من الأحدث للأقدم
        this.orders = res.reverse();
        this.calculateTotalSpent();
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  calculateTotalSpent() {
    this.totalSpent = this.orders.reduce((acc, order) => {
      return acc + (order.total || this.calculateOrderTotal(order));
    }, 0);
  }

  calculateOrderTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}