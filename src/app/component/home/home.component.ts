import { Component, OnInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import AOS from 'aos';

import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';

import { FormsModule } from '@angular/forms';
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('swiperRef') swiperRef!: ElementRef;

  products: any[] = [];
  filteredProducts: any[] = [];

  selectedProduct: any = null;
  selectedImage: string | null = null;
  quantity: number = 1;
  selectedSize: string = 'M';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.initAOS();
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  // ===== PRODUCTS (أول 8 فقط) =====
  loadProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      this.filteredProducts = res.slice(0, 8); // 🔥 أول 8 منتجات فقط
    });
  }

  // ===== SWIPER =====
  initSwiper() {
    const swiperEl = this.swiperRef.nativeElement;

    Object.assign(swiperEl, {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      on: {
        init: () => this.refreshAOS(),
        slideChangeTransitionEnd: () => this.refreshAOS()
      }
    });

    swiperEl.initialize();
  }

  nextSlide() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }

  prevSlide() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  // ===== AOS =====
  initAOS() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
  }

  refreshAOS() {
    setTimeout(() => AOS.refreshHard(), 100);
  }

  // ===== MODAL =====
  openModal(product: any) {
    this.selectedProduct = product;
    this.selectedImage = product.images[0];
    this.quantity = 1;
    this.selectedSize = 'M';

    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      new (window as any).bootstrap.Modal(modalElement).show();
    }
  }

  addToCart() {
    if (!this.selectedProduct) return;

    this.orderService.addItemToCart(
      this.selectedProduct._id,
      this.quantity,
      this.selectedSize
    ).subscribe(() => {
      alert('✅ Added to cart');
    });
  }
}
