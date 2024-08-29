import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NgxMatDatepickerBase } from './datepicker-base';
import { NGX_MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER } from './date-selection-model';
import { NGX_MAT_CALENDAR_RANGE_STRATEGY_PROVIDER } from './date-range-selection-strategy';
import * as i0 from "@angular/core";
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDateRangePicker"). We can change this to a
// directive if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the date range picker popup/dialog. */
export class NgxMatDateRangePicker extends NgxMatDatepickerBase {
    _forwardContentValues(instance) {
        super._forwardContentValues(instance);
        const input = this.datepickerInput;
        if (input) {
            instance.comparisonStart = input.comparisonStart;
            instance.comparisonEnd = input.comparisonEnd;
            instance.startDateAccessibleName = input._getStartDateAccessibleName();
            instance.endDateAccessibleName = input._getEndDateAccessibleName();
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDateRangePicker, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    /** @nocollapse */ static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.2", type: NgxMatDateRangePicker, selector: "ngx-mat-date-range-picker", providers: [
            NGX_MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
            NGX_MAT_CALENDAR_RANGE_STRATEGY_PROVIDER,
            { provide: NgxMatDatepickerBase, useExisting: NgxMatDateRangePicker },
        ], exportAs: ["ngxMatDateRangePicker"], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatDateRangePicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-mat-date-range-picker',
                    template: '',
                    exportAs: 'ngxMatDateRangePicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        NGX_MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
                        NGX_MAT_CALENDAR_RANGE_STRATEGY_PROVIDER,
                        { provide: NgxMatDatepickerBase, useExisting: NgxMatDateRangePicker },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRldGltZS1waWNrZXIvc3JjL2xpYi9kYXRlLXJhbmdlLXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxvQkFBb0IsRUFBbUQsTUFBTSxtQkFBbUIsQ0FBQztBQUN6RyxPQUFPLEVBQUMsMkNBQTJDLEVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRyxPQUFPLEVBQUMsd0NBQXdDLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFhekYsOEZBQThGO0FBQzlGLDZGQUE2RjtBQUM3RiwrRUFBK0U7QUFDL0UsNkVBQTZFO0FBYTdFLE1BQU0sT0FBTyxxQkFBeUIsU0FBUSxvQkFJN0M7SUFDb0IscUJBQXFCLENBQUMsUUFBcUQ7UUFDNUYsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFFbkMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLFFBQVEsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNqRCxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDN0MsUUFBUSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBQ3ZFLFFBQVEsQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNyRSxDQUFDO0lBQ0gsQ0FBQztpSUFoQlUscUJBQXFCO3FIQUFyQixxQkFBcUIsb0RBTnJCO1lBQ1QsMkNBQTJDO1lBQzNDLHdDQUF3QztZQUN4QyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUM7U0FDcEUsc0ZBUlMsRUFBRTs7MkZBVUQscUJBQXFCO2tCQVpqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSxFQUFFO29CQUNaLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFO3dCQUNULDJDQUEyQzt3QkFDM0Msd0NBQXdDO3dCQUN4QyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxXQUFXLHVCQUF1QixFQUFDO3FCQUNwRTtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hNYXREYXRlcGlja2VyQmFzZSwgTmd4TWF0RGF0ZXBpY2tlckNvbnRlbnQsIE5neE1hdERhdGVwaWNrZXJDb250cm9sfSBmcm9tICcuL2RhdGVwaWNrZXItYmFzZSc7XG5pbXBvcnQge05HWF9NQVRfUkFOR0VfREFURV9TRUxFQ1RJT05fTU9ERUxfUFJPVklERVIsIE5neERhdGVSYW5nZX0gZnJvbSAnLi9kYXRlLXNlbGVjdGlvbi1tb2RlbCc7XG5pbXBvcnQge05HWF9NQVRfQ0FMRU5EQVJfUkFOR0VfU1RSQVRFR1lfUFJPVklERVJ9IGZyb20gJy4vZGF0ZS1yYW5nZS1zZWxlY3Rpb24tc3RyYXRlZ3knO1xuXG4vKipcbiAqIElucHV0IHRoYXQgY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBhIGRhdGUgcmFuZ2UgcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5neE1hdERhdGVSYW5nZVBpY2tlcklucHV0PEQ+IGV4dGVuZHMgTmd4TWF0RGF0ZXBpY2tlckNvbnRyb2w8RD4ge1xuICBfZ2V0RW5kRGF0ZUFjY2Vzc2libGVOYW1lKCk6IHN0cmluZyB8IG51bGw7XG4gIF9nZXRTdGFydERhdGVBY2Nlc3NpYmxlTmFtZSgpOiBzdHJpbmcgfCBudWxsO1xuICBjb21wYXJpc29uU3RhcnQ6IEQgfCBudWxsO1xuICBjb21wYXJpc29uRW5kOiBEIHwgbnVsbDtcbn1cblxuLy8gVE9ETyhtbWFsZXJiYSk6IFdlIHVzZSBhIGNvbXBvbmVudCBpbnN0ZWFkIG9mIGEgZGlyZWN0aXZlIGhlcmUgc28gdGhlIHVzZXIgY2FuIHVzZSBpbXBsaWNpdFxuLy8gdGVtcGxhdGUgcmVmZXJlbmNlIHZhcmlhYmxlcyAoZS5nLiAjZCB2cyAjZD1cIm1hdERhdGVSYW5nZVBpY2tlclwiKS4gV2UgY2FuIGNoYW5nZSB0aGlzIHRvIGFcbi8vIGRpcmVjdGl2ZSBpZiBhbmd1bGFyIGFkZHMgc3VwcG9ydCBmb3IgYGV4cG9ydEFzOiAnJGltcGxpY2l0J2Agb24gZGlyZWN0aXZlcy5cbi8qKiBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIHRoZSBkYXRlIHJhbmdlIHBpY2tlciBwb3B1cC9kaWFsb2cuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtbWF0LWRhdGUtcmFuZ2UtcGlja2VyJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBleHBvcnRBczogJ25neE1hdERhdGVSYW5nZVBpY2tlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtcbiAgICBOR1hfTUFUX1JBTkdFX0RBVEVfU0VMRUNUSU9OX01PREVMX1BST1ZJREVSLFxuICAgIE5HWF9NQVRfQ0FMRU5EQVJfUkFOR0VfU1RSQVRFR1lfUFJPVklERVIsXG4gICAge3Byb3ZpZGU6IE5neE1hdERhdGVwaWNrZXJCYXNlLCB1c2VFeGlzdGluZzogTmd4TWF0RGF0ZVJhbmdlUGlja2VyfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0RGF0ZVJhbmdlUGlja2VyPEQ+IGV4dGVuZHMgTmd4TWF0RGF0ZXBpY2tlckJhc2U8XG4gIE5neE1hdERhdGVSYW5nZVBpY2tlcklucHV0PEQ+LFxuICBOZ3hEYXRlUmFuZ2U8RD4sXG4gIERcbj4ge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2ZvcndhcmRDb250ZW50VmFsdWVzKGluc3RhbmNlOiBOZ3hNYXREYXRlcGlja2VyQ29udGVudDxOZ3hEYXRlUmFuZ2U8RD4sIEQ+KSB7XG4gICAgc3VwZXIuX2ZvcndhcmRDb250ZW50VmFsdWVzKGluc3RhbmNlKTtcblxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5kYXRlcGlja2VySW5wdXQ7XG5cbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGluc3RhbmNlLmNvbXBhcmlzb25TdGFydCA9IGlucHV0LmNvbXBhcmlzb25TdGFydDtcbiAgICAgIGluc3RhbmNlLmNvbXBhcmlzb25FbmQgPSBpbnB1dC5jb21wYXJpc29uRW5kO1xuICAgICAgaW5zdGFuY2Uuc3RhcnREYXRlQWNjZXNzaWJsZU5hbWUgPSBpbnB1dC5fZ2V0U3RhcnREYXRlQWNjZXNzaWJsZU5hbWUoKTtcbiAgICAgIGluc3RhbmNlLmVuZERhdGVBY2Nlc3NpYmxlTmFtZSA9IGlucHV0Ll9nZXRFbmREYXRlQWNjZXNzaWJsZU5hbWUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==