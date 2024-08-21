import { Component, inject, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { GenerateRatingStarService } from '@shared/services/generateRatingStar/generateRatingStar.service';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  template: ` <span class="flex items-center">
    @for (item of starsArray; track index; let index = $index) {
      <span [innerHTML]="generateStarSVG(index)"></span>
    }
    <span class="text-xs ml-3 text-gray-600"
      >{{ ratingCount ?? 0 }} reviews</span
    >
  </span>`,
})
export class RatingStarsComponent {
  @Input() ratingRate: number | undefined;
  @Input() ratingCount: number | undefined;
  public readonly starsArray: number[] = new Array(5).fill(0);
  private readonly _generateRatingStar = inject(GenerateRatingStarService);

  generateStarSVG(index: number): SafeHtml {
    return this._generateRatingStar.generateRatingStar(
      index,
      this.ratingRate ?? 0,
    );
  }
}
