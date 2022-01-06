import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [flyInOut(), expand()]
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leader) => { this.leaders = leader })
  }

}
