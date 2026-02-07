import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  imports:[CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  blogPosts = [
    {
      title: '10 Essential Wardrobe Pieces for 2026',
      category: 'Trends',
      date: 'Feb 4, 2026',
      excerpt: 'Discover the key pieces that will define your style this year, from sustainable fabrics to bold silhouettes.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
      likes: 124,
      comments: 18
    },
    {
      title: 'The Art of Mixing Streetwear with Luxury',
      category: 'Style Guide',
      date: 'Jan 28, 2026',
      excerpt: 'How to balance comfort and high-end fashion effortlessly in your everyday outfits.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      likes: 89,
      comments: 12
    }
  ];

}
