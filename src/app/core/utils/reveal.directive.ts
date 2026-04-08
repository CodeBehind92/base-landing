import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal-ready]': 'true',
    '[class.revealed]': 'isVisible()',
    '[style.transition-delay]': 'delay()',
  },
})
export class RevealDirective implements OnDestroy {
  private readonly el = inject(ElementRef);
  private observer?: IntersectionObserver;

  readonly isVisible = signal(false);
  readonly delay = input('0ms');

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible.set(true);
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
