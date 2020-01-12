import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OffertComponent } from './components/offert/offert.component';
import { ContactComponent } from './components/contact/contact.component';
import { RodoComponent } from './components/rodo/rodo.component';
import * as firebase from 'firebase/app';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'o-nas', component: AboutUsComponent, data: { animation: 'o-nas' } },
  { path: 'oferta', component: OffertComponent, data: { animation: 'oferta' } },
  { path: 'kontakt', component: ContactComponent, data: { animation: 'kontakt' } },
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { animation: 'home' } },
  // { path: '**', component: HomeComponent }
];
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopBarComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    AboutUsComponent,
    OffertComponent,
    ContactComponent,
    RodoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    },

    ),
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LejvccUAAAAAN7xZIRECSAtSRS21rbvZP4pMihb',
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

