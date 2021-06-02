import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArrayComponent } from './components/array/array.component';
import { VisualiserComponent } from './components/visualiser/visualiser.component';
import { ModalComponent } from './components/modal/modal.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayComponent,
    VisualiserComponent,
    ModalComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
