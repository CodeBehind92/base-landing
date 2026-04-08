import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Centralizes all programmatic scroll logic for the application.
 *
 * - scrollToSection: smooth-scrolls to a home-page section by ID.
 *   If the element is not in the DOM (user is on a sub-landing), it
 *   navigates to "/" instead; withInMemoryScrolling in the router config
 *   will handle scrolling to the top on that route change.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly router = inject(Router);

  scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
