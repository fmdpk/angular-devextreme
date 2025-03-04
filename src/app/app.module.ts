import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DxHttpModule } from 'devextreme-angular/http';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './pages/test/test.component';
import { DxListModule } from 'devextreme-angular';

export const MY_TOKEN = new InjectionToken<string[]>('MyToken');
export const MY_CLASS_TOKEN = new InjectionToken<MyClass[]>('MyClassToken');
export class MyClass {
  constructor(public name: string, public age: number) {}

  log() {
    console.log(this.name + ': ' + this.age);
  }
}

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxListModule,
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    { provide: MY_TOKEN, useValue: 'Value1', multi: true },
    { provide: MY_TOKEN, useValue: 'Value2', multi: true },
    { provide: MY_TOKEN, useValue: 'Value3', multi: true },
    {
      provide: MY_CLASS_TOKEN,
      useValue: new MyClass('Alice', 30),
      multi: true,
    },
    { provide: MY_CLASS_TOKEN, useValue: new MyClass('Bob', 25), multi: true },
    {
      provide: MY_CLASS_TOKEN,
      useValue: new MyClass('Charlie', 35),
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
