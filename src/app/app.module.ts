import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TransformToJsonPipe } from './transform-to-json.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    TransformToJsonPipe,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
