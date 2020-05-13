import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
