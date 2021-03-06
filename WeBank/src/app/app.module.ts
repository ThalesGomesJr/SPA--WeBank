// modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CurrencyMaskModule } from 'ng2-currency-mask';

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { DepositComponent } from './deposit/deposit.component';
import { SaveBalanceComponent } from './saveBalance/saveBalance.component';
import { ExtractComponent } from './extract/extract.component';
import { TransferComponent } from './transfer/transfer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    UserProfileComponent,
    DepositComponent,
    SaveBalanceComponent,
    ExtractComponent,
    TransferComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
