import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UiModule} from './ui/ui.module';
import {MetaMaskService} from './metamask.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {LotteryPageComponent} from './lottery-page/lottery-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    LotteryPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [MetaMaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
