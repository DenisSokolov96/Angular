import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HeaderService} from './services/header.service';


import {AppComponent} from './app.component';
import {LoginComponent} from './modules/login/login.component';
import {RestService} from './services/rest.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminpanelComponent} from './modules/adminpanel/adminpanel.component';
import {BasicAuthInterceptor} from './services/basic-auth.interceptor';
import {ErrorInterceptor} from './services/error.interceptor';
import { BoxsComponent } from './modules/boxs/boxs.component';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutosComponent } from './modules/autos/autos.component';
import { PersondataComponent } from './modules/persondata/persondata.component';
import { DealspanelComponent } from './modules/dealspanel/dealspanel.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminpanelComponent},
  {path: 'boxs', component: BoxsComponent},
  {path: 'app', component: AppComponent},
  {path: 'auto', component: AutosComponent},
  {path: 'persondata', component: PersondataComponent},
  {path: 'deals', component: DealspanelComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}

];

// @ts-ignore
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HeaderService,
    RestService,
    AuthService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    AdminpanelComponent,
    BoxsComponent,
    AutosComponent,
    PersondataComponent,
    DealspanelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
