import { Component } from '@angular/core';
import { Navbar } from "@shared/components/layout/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [Navbar],
  template: `
  <app-navbar>
  <main id="main-content" tabindex="-1">
  </main>
  `,
  styles: ``,
})
export class Home {}
