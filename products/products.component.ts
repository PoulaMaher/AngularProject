import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  output,
  SimpleChanges,
} from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { FormsModule } from '@angular/forms';
import { LightBoxDirective } from '../../directives/light-box.directive';
import { BorderShadowDirective } from '../../directives/border-shadow.directive';
import { VisaCardNumPipe } from '../../pipes/visa-card-num.pipe';
import { ICardItem } from '../../Models/icard-item';
import { StaticProductsService } from '../../Services/static-products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [
    CommonModule,
    FormsModule,
    LightBoxDirective,
    BorderShadowDirective,
    VisaCardNumPipe,
  ],
})
export class ProductsComponent implements OnChanges {
  @Input() count: number;
  @Output() orderCreated: EventEmitter<ICardItem>;
  categoryProducts: IProduct[];
  @Input() recievedCategoryId: number = 0;
  totalPrice: number = 0;
  cardItem: ICardItem;
  /**
   *
   */
  constructor(
    private staticPrdService: StaticProductsService,
    private router: Router
  ) {
    this.cardItem = { productName: '', count: 0, itemPrice: 0, totalPrice: 0 };
    this.orderCreated = new EventEmitter();
    this.count = 0;
    this.categoryProducts = [];

    this.categoryProducts = this.staticPrdService.getByCatId(0);
  }
  ngOnChanges(): void {
    this.categoryProducts = this.staticPrdService.getByCatId(
      this.recievedCategoryId
    );
  }
  public buy(q: IProduct, count: string) {
    this.totalPrice = +count * q.Price;
    this.cardItem.productName = q.Name;
    this.cardItem.count = +count;
    this.cardItem.itemPrice = q.Price;
    this.cardItem.totalPrice = this.totalPrice;
    this.orderCreated.emit(this.cardItem);
  }
  public openPrdDetails(pid: number) {
    this.router.navigate(['/product', pid]);
  }
}
