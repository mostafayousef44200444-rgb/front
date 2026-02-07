import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

@Component({
  selector: 'app-shop',
  imports:[CommonModule,FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = true;
  selectedCategory: string = '';

  // Modal Data
  selectedProduct: Product | null = null;
  selectedImage: string | null = null;
  quantity: number = 1;
  selectedSize: string = 'M';

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = res;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.filteredProducts = cat ? this.products.filter(p => p.category === cat) : this.products;
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.selectedImage = product.images[0];
    this.quantity = 1;
    this.selectedSize = 'M';

    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      // @ts-ignore
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addToCart() {
    if (!this.selectedProduct) return;
    this.orderService.addItemToCart(this.selectedProduct._id, this.quantity, this.selectedSize)
      .subscribe(() => alert('✅ Added to cart'));
  }
}