import { Component, OnInit } from '@angular/core';
import { iLeader } from '../shared/iLeader';
import { LEADERS } from '../shared/leaders';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: iLeader[] = LEADERS;

  constructor() { }

  ngOnInit(): void {
  }

}
