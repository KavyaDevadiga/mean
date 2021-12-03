import { postOutputComponent } from './posts/post-output/post-output.component';
import { headerComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { postcreatecomponent } from './posts/post-create/post-create.component';

// https://medium.com/mighty-ghost-hack/how-to-deploy-angular-app-on-github-61261c0891e0

@NgModule({
  declarations: [
    AppComponent,
    postcreatecomponent,
    headerComponent,
    postOutputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
