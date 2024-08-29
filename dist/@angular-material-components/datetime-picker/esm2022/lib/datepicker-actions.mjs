import { ChangeDetectionStrategy, Component, Directive, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-base";
/** Button that will close the datepicker and assign the current selection to the data model. */
export class NgxMatDatepickerApply {
    constructor(_datepicker) {
        this._datepicker = _datepicker;
    }
    _applySelection() {
        this._datepicker._applyPendingSelection();
        this._datepicker.close();
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDatepickerApply, deps: [{ token: i1.NgxMatDatepickerBase }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.2", type: NgxMatDatepickerApply, selector: "[ngxMatDatepickerApply], [ngxMatDateRangePickerApply]", host: { listeners: { "click": "_applySelection()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDatepickerApply, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxMatDatepickerApply], [ngxMatDateRangePickerApply]',
                    host: { '(click)': '_applySelection()' },
                }]
        }], ctorParameters: () => [{ type: i1.NgxMatDatepickerBase }] });
/** Button that will close the datepicker and discard the current selection. */
export class NgxMatDatepickerCancel {
    constructor(_datepicker) {
        this._datepicker = _datepicker;
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDatepickerCancel, deps: [{ token: i1.NgxMatDatepickerBase }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.2", type: NgxMatDatepickerCancel, selector: "[ngxMatDatepickerCancel], [ngxMatDateRangePickerCancel]", host: { listeners: { "click": "_datepicker.close()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDatepickerCancel, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxMatDatepickerCancel], [ngxMatDateRangePickerCancel]',
                    host: { '(click)': '_datepicker.close()' },
                }]
        }], ctorParameters: () => [{ type: i1.NgxMatDatepickerBase }] });
/**
 * Container that can be used to project a row of action buttons
 * to the bottom of a datepicker or date range picker.
 */
export class NgxMatDatepickerActions {
    constructor(_datepicker, _viewContainerRef) {
        this._datepicker = _datepicker;
        this._viewContainerRef = _viewContainerRef;
    }
    ngAfterViewInit() {
        this._portal = new TemplatePortal(this._template, this._viewContainerRef);
        this._datepicker.registerActions(this._portal);
    }
    ngOnDestroy() {
        this._datepicker.removeActions(this._portal);
        // Needs to be null checked since we initialize it in `ngAfterViewInit`.
        if (this._portal && this._portal.isAttached) {
            this._portal?.detach();
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDatepickerActions, deps: [{ token: i1.NgxMatDatepickerBase }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component }); }
    /** @nocollapse */ static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.2", type: NgxMatDatepickerActions, selector: "ngx-mat-datepicker-actions, ngx-mat-date-range-picker-actions", viewQueries: [{ propertyName: "_template", first: true, predicate: TemplateRef, descendants: true }], ngImport: i0, template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:8px}.mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDatepickerActions, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-mat-datepicker-actions, ngx-mat-date-range-picker-actions', template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:8px}.mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"] }]
        }], ctorParameters: () => [{ type: i1.NgxMatDatepickerBase }, { type: i0.ViewContainerRef }], propDecorators: { _template: [{
                type: ViewChild,
                args: [TemplateRef]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0ZXRpbWUtcGlja2VyL3NyYy9saWIvZGF0ZXBpY2tlci1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7OztBQUduRCxnR0FBZ0c7QUFLaEcsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFvQixXQUF3RTtRQUF4RSxnQkFBVyxHQUFYLFdBQVcsQ0FBNkQ7SUFBRyxDQUFDO0lBRWhHLGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDO2lJQU5VLHFCQUFxQjtxSEFBckIscUJBQXFCOzsyRkFBckIscUJBQXFCO2tCQUpqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1REFBdUQ7b0JBQ2pFLElBQUksRUFBRSxFQUFDLFNBQVMsRUFBRSxtQkFBbUIsRUFBQztpQkFDdkM7O0FBVUQsK0VBQStFO0FBSy9FLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFBbUIsV0FBd0U7UUFBeEUsZ0JBQVcsR0FBWCxXQUFXLENBQTZEO0lBQUcsQ0FBQztpSUFEcEYsc0JBQXNCO3FIQUF0QixzQkFBc0I7OzJGQUF0QixzQkFBc0I7a0JBSmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlEQUF5RDtvQkFDbkUsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFDO2lCQUN6Qzs7QUFLRDs7O0dBR0c7QUFjSCxNQUFNLE9BQU8sdUJBQXVCO0lBSWxDLFlBQ1UsV0FBd0UsRUFDeEUsaUJBQW1DO1FBRG5DLGdCQUFXLEdBQVgsV0FBVyxDQUE2RDtRQUN4RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO0lBQzFDLENBQUM7SUFFSixlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3Qyx3RUFBd0U7UUFDeEUsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQztpSUFyQlUsdUJBQXVCO3FIQUF2Qix1QkFBdUIsZ0pBQ3ZCLFdBQVcsZ0RBWFo7Ozs7OztHQU1UOzsyRkFJVSx1QkFBdUI7a0JBYm5DLFNBQVM7K0JBQ0UsK0RBQStELFlBRS9EOzs7Ozs7R0FNVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTt3SEFHYixTQUFTO3NCQUFoQyxTQUFTO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBPbkRlc3Ryb3ksXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGVtcGxhdGVQb3J0YWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtOZ3hNYXREYXRlcGlja2VyQmFzZSwgTmd4TWF0RGF0ZXBpY2tlckNvbnRyb2x9IGZyb20gJy4vZGF0ZXBpY2tlci1iYXNlJztcblxuLyoqIEJ1dHRvbiB0aGF0IHdpbGwgY2xvc2UgdGhlIGRhdGVwaWNrZXIgYW5kIGFzc2lnbiB0aGUgY3VycmVudCBzZWxlY3Rpb24gdG8gdGhlIGRhdGEgbW9kZWwuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmd4TWF0RGF0ZXBpY2tlckFwcGx5XSwgW25neE1hdERhdGVSYW5nZVBpY2tlckFwcGx5XScsXG4gIGhvc3Q6IHsnKGNsaWNrKSc6ICdfYXBwbHlTZWxlY3Rpb24oKSd9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXREYXRlcGlja2VyQXBwbHkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRlcGlja2VyOiBOZ3hNYXREYXRlcGlja2VyQmFzZTxOZ3hNYXREYXRlcGlja2VyQ29udHJvbDxhbnk+LCB1bmtub3duPikge31cblxuICBfYXBwbHlTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5fZGF0ZXBpY2tlci5fYXBwbHlQZW5kaW5nU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5fZGF0ZXBpY2tlci5jbG9zZSgpO1xuICB9XG59XG5cbi8qKiBCdXR0b24gdGhhdCB3aWxsIGNsb3NlIHRoZSBkYXRlcGlja2VyIGFuZCBkaXNjYXJkIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ3hNYXREYXRlcGlja2VyQ2FuY2VsXSwgW25neE1hdERhdGVSYW5nZVBpY2tlckNhbmNlbF0nLFxuICBob3N0OiB7JyhjbGljayknOiAnX2RhdGVwaWNrZXIuY2xvc2UoKSd9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXREYXRlcGlja2VyQ2FuY2VsIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9kYXRlcGlja2VyOiBOZ3hNYXREYXRlcGlja2VyQmFzZTxOZ3hNYXREYXRlcGlja2VyQ29udHJvbDxhbnk+LCB1bmtub3duPikge31cbn1cblxuLyoqXG4gKiBDb250YWluZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm9qZWN0IGEgcm93IG9mIGFjdGlvbiBidXR0b25zXG4gKiB0byB0aGUgYm90dG9tIG9mIGEgZGF0ZXBpY2tlciBvciBkYXRlIHJhbmdlIHBpY2tlci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LW1hdC1kYXRlcGlja2VyLWFjdGlvbnMsIG5neC1tYXQtZGF0ZS1yYW5nZS1waWNrZXItYWN0aW9ucycsXG4gIHN0eWxlVXJsczogWydkYXRlcGlja2VyLWFjdGlvbnMuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtZGF0ZXBpY2tlci1hY3Rpb25zXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXREYXRlcGlja2VyQWN0aW9ucyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIF90ZW1wbGF0ZTogVGVtcGxhdGVSZWY8dW5rbm93bj47XG4gIHByaXZhdGUgX3BvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZGF0ZXBpY2tlcjogTmd4TWF0RGF0ZXBpY2tlckJhc2U8Tmd4TWF0RGF0ZXBpY2tlckNvbnRyb2w8YW55PiwgdW5rbm93bj4sXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5fdGVtcGxhdGUsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgIHRoaXMuX2RhdGVwaWNrZXIucmVnaXN0ZXJBY3Rpb25zKHRoaXMuX3BvcnRhbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kYXRlcGlja2VyLnJlbW92ZUFjdGlvbnModGhpcy5fcG9ydGFsKTtcblxuICAgIC8vIE5lZWRzIHRvIGJlIG51bGwgY2hlY2tlZCBzaW5jZSB3ZSBpbml0aWFsaXplIGl0IGluIGBuZ0FmdGVyVmlld0luaXRgLlxuICAgIGlmICh0aGlzLl9wb3J0YWwgJiYgdGhpcy5fcG9ydGFsLmlzQXR0YWNoZWQpIHtcbiAgICAgIHRoaXMuX3BvcnRhbD8uZGV0YWNoKCk7XG4gICAgfVxuICB9XG59XG4iXX0=