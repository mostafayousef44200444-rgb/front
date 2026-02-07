import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LognComponent } from './component/logn/logn.component';
import { RegisterComponent } from './component/register/register.component';
import { ShopComponent } from './component/shop/shop.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AboutComponent } from './component/about/about.component';
import { FeaturesComponent } from './component/features/features.component';
import { BlogComponent } from './component/blog/blog.component';
import { ContactComponent } from './component/contact/contact.component';
export const routes: Routes = [
    
    { path: '', component: HomeComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LognComponent },
  { path: 'profile', component: ProfileComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'shop', component: ShopComponent },
    {path: 'cart', component: CartComponent },
    {path: 'checkout', component: CheckoutComponent },
    {path:'about',component:AboutComponent},
    {path:'features',component:FeaturesComponent},
    {path:'blog',component:BlogComponent},
    {path:'contact',component:ContactComponent}
];
