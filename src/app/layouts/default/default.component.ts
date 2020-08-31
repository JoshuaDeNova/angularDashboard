import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public bSidebarOpen: boolean;
  public bPixelsMobile: boolean;

  constructor() { 
    this.bSidebarOpen = true;
    this.isMobile(window.innerWidth);
  }

  ngOnInit() {
  }

  menuControl(){
    this.bSidebarOpen = !this.bSidebarOpen;
  }

  isMobile(width){
    if(width < 800){
      this.bPixelsMobile = true;
    }else{
      this.bPixelsMobile = false;
    }
  }

  onResize(event){
    this.isMobile(event.target.innerWidth);
  }

}
