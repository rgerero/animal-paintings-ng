import { Component, OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]=[]
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService
    , private cartService: CartService
    , private snackbar: MatSnackBar
    ){  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open(`${product.name} added to cart`, 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(filterValue) 
    );
    // this.productService.getProducts().subscribe(data => {
    //   this.products = data.filter(product => 
    //     product.name.toLowerCase().includes(searchText) || 
    //     product.description.toLowerCase().includes(searchText)
    //   );
    // });
  }


}
