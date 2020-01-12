import { Component } from '@angular/core';
import { opacityAnimation } from './route-animation';
import * as firebase from 'firebase/app';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [opacityAnimation]
})
export class AppComponent {
  title = 'car-webiste';

  constructor(private metaTagService: Meta) {

  }

  ngAfterViewInit() {
    firebase.analytics();
    firebase.performance();
  }

  ngOnInit() {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'PeliCar Skup Aut Gdańsk Gdynia Sopot' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Mateusz Zawadzki' },
      { name: 'date', content: '2019-12-18', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
      { name: 'description', content: 'PeliCar Skup Aut w Gdańsk, Gdynii, Sopocie oraz miejscowościach w pobliżu.' }
    ]);
  }
}