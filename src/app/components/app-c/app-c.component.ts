import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'dark-app-c',
  templateUrl: './app-c.component.html',
  styleUrls: ['./app-c.component.scss']
})
export class AppCComponent implements OnInit {

  show: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe( (query: Params) => {
      Number(query['enter']) === 2 ? this.show = true : this.show = false;
    });
  }

  onEnterCharacters() {
    this.router.navigate(['characters'], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { enter: 3 } })
  }

}
