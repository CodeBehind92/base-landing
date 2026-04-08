import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="
        'flex flex-col gap-4 ' +
        (align() === 'center'
          ? 'items-center text-center'
          : align() === 'right'
            ? 'items-end text-right'
            : 'items-start text-left')
      "
    >
      @if (eyebrow()) {
        <span
          class="text-xs uppercase tracking-widest font-semibold text-amber-400 px-3 py-1 rounded-lg border border-amber-400/20 bg-amber-400/5 w-fit"
        >
          {{ eyebrow() }}
        </span>
      }
      <h2
        [attr.id]="headingId() || null"
        class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight whitespace-pre-line"
      >
        {{ title() }}
      </h2>
      @if (subtitle()) {
        <p class="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {{ subtitle() }}
        </p>
      }
    </div>
  `,
})
export class SectionHeaderComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly align = input<'left' | 'center' | 'right'>('center');
  readonly headingId = input('');
}
