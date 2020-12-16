import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from '../environments/environment';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LogtimeComponent } from './logtime/logtime.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbCardModule, NbTableModule, NbToastrModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './home/home.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';
import { NbIconModule } from '@nebular/theme';
import { NbMenuShowcaseComponent } from './shared/nb-menu-showcase/nb-menu-showcase.component'
import { SigninComponent } from './signin/signin.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LogtimeComponent,
    NavbarComponent,
    FooterComponent,
    NbMenuShowcaseComponent,
    HomeComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbTableModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    NbIconModule,
    LazyLoadImageModule,
    NbSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
