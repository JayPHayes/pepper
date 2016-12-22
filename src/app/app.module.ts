import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
    apiKey: "AIzaSyASX6btT_T5AiqG33kpRL7MrivG8gN280o",
    authDomain: "pepper-1a9fa.firebaseapp.com",
    databaseURL: "https://pepper-1a9fa.firebaseio.com",
    storageBucket: "pepper-1a9fa.appspot.com",
    messagingSenderId: "719882609973"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
