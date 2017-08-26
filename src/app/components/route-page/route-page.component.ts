import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dark-route-page',
  templateUrl: './route-page.component.html',
  styleUrls: ['./route-page.component.scss']
})
export class RoutePageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  onEnterCharacters() {
    this.router.navigate(['app-c', 'characters'], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { enter: 3 } })
  }

  onEnterAbout() {
    this.router.navigate(['about'], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { enter: 2 } })
  }

  onEnterApp() {
    this.router.navigate(['app-c'], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { enter: 2 } })
  }

  onEnterContact() {
    this.router.navigate(['contact'], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { enter: 2 } })
  }

}
