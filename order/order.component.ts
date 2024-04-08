import { Component, Input, Output, ViewChild, viewChild } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ICategory } from '../../Models/igategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICardItem } from '../../Models/icard-item';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ProductsComponent, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  OrderTotalPrice: number = 0;
  categories: ICategory[];
  selectCatId: number = 0;
  totalPrice: number = 0;
  cardItems: ICardItem[];
  cardItem: ICardItem = {
    productName: '',
    count: 0,
    itemPrice: 0,
    totalPrice: 0,
  };
  deletedCardItem!: ICardItem;
  @ViewChild(ProductsComponent) productsListObj!: ProductsComponent;
  constructor() {
    this.cardItems = [];
    this.categories = [
      {
        Id: 1,
        Name: 'Phones',
      },
      {
        Id: 2,
        Name: 'Laptops',
      },
      {
        Id: 3,
        Name: 'Accessories',
      },
    ];
  }
  public onOrderCreated(cardItem: ICardItem) {
    this.cardItems.push(cardItem);
    this.OrderTotalPrice += cardItem.totalPrice;
  }
  public placeOreder() {}
  // public DeleteItem(cardItem: ICardItem) {
  //   this.deletedCardItem = this.cardItems.find(
  //     (c) => c.productName == cardItem.productName
  //   );
  // }
}
