import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FinalPractical';
  currentURL:any;
  
  constructor(private _router: Router){}

  ngOnInit(): void {
    //fetch current page url to show active menu item
    this.currentURL = this._router.url;
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentURL = event.url;
      }
    });

  }
   
}
