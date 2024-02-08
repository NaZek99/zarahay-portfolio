import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { HeroComponent } from './component/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PortfolioComponent,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    HeroComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
