import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="example-button-row">
      <button mat-raised-button>Basic</button>
      <button mat-raised-button color="primary">Primary</button>
      <button mat-raised-button color="accent">Accent</button>
      <button mat-raised-button color="warn">Warn</button>
      <button mat-raised-button disabled>Disabled</button>
      <a mat-raised-button routerLink=".">Link</a>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'lysurge';
}
