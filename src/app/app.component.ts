import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    setTimeout(() => { this.router.navigate(['p'], { relativeTo: this.route }); }, 350);
  }

}
