import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
