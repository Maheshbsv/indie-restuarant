import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  dishErrorMessage!: string;
  promotion!: Promotion;
  promotionErrorMessage!: string;
  leader!: Leader;
  leaderErrorMessage!: string;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDishes().subscribe({ next: (dish) => this.dish = dish, error: errMessage => this.dishErrorMessage = <any>errMessage });
    this.promotionService.getFeaturedPromotion().subscribe({ next: (promotion) => this.promotion = promotion, error: errMessage => this.promotionErrorMessage = <any>errMessage });
    this.leaderService.getFeaturedLeader().subscribe({ next: leader => this.leader = leader, error: errMessage => this.leaderErrorMessage = <any>errMessage });

  }

}
