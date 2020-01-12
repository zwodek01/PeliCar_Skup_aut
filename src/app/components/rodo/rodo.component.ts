import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rodo',
  templateUrl: './rodo.component.html',
  styleUrls: ['./rodo.component.scss']
})
export class RodoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem("rules") === 'true') {
      this.isActive = false;
    }
  }

  isActive = true;

  toggleRules() {
    if (localStorage.getItem("rules") !== 'true') {
      localStorage.setItem("rules", "true")
    }
    this.isActive = !this.isActive
  }
}
