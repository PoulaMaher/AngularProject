import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticProductsService } from '../../Services/static-products.service';
import { IProduct } from '../../Models/iproduct';
import { CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  currentPrdId: number;
  currentProduct: IProduct | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private staticProductsService: StaticProductsService,
    private location: Location
  ) {
    this.currentPrdId = 0;
  }
  ngOnInit(): void {
    this.currentPrdId = Number(
      this.activatedRoute.snapshot.paramMap.get('pid')
    );
    this.currentProduct = this.staticProductsService.getById(this.currentPrdId);
  }
  public goBack(): void {
    this.location.back();
  }
}
