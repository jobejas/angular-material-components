import { Component, forwardRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { createMissingDateImplError, DEFAULT_STEP, formatTwoDigitTimeValue, LIMIT_TIMES, MERIDIANS, NUMERIC_REGEX, PATTERN_INPUT_HOUR, PATTERN_INPUT_MINUTE, PATTERN_INPUT_SECOND } from './utils/date-utils';
import * as i0 from "@angular/core";
import * as i1 from "./core/date-adapter";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/input";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/icon";
import * as i7 from "@angular/material/button";
export class NgxMatTimepickerComponent {
    /** Hour */
    get hour() {
        let val = Number(this.form.controls['hour'].value);
        return isNaN(val) ? 0 : val;
    }
    ;
    get minute() {
        let val = Number(this.form.controls['minute'].value);
        return isNaN(val) ? 0 : val;
    }
    ;
    get second() {
        let val = Number(this.form.controls['second'].value);
        return isNaN(val) ? 0 : val;
    }
    ;
    /** Whether or not the form is valid */
    get valid() {
        return this.form.valid;
    }
    constructor(_dateAdapter, cd, formBuilder) {
        this._dateAdapter = _dateAdapter;
        this.cd = cd;
        this.formBuilder = formBuilder;
        this.disabled = false;
        this.showSpinners = true;
        this.stepHour = DEFAULT_STEP;
        this.stepMinute = DEFAULT_STEP;
        this.stepSecond = DEFAULT_STEP;
        this.showSeconds = false;
        this.disableMinute = false;
        this.enableMeridian = false;
        this.color = 'primary';
        this.meridian = MERIDIANS.AM;
        this._onChange = () => { };
        this._onTouched = () => { };
        this._destroyed = new Subject();
        this.pattern = PATTERN_INPUT_HOUR;
        if (!this._dateAdapter) {
            throw createMissingDateImplError('NgxMatDateAdapter');
        }
        this.form = this.formBuilder.group({
            hour: [{ value: null, disabled: this.disabled }, [Validators.required, Validators.pattern(PATTERN_INPUT_HOUR)]],
            minute: [{ value: null, disabled: this.disabled }, [Validators.required, Validators.pattern(PATTERN_INPUT_MINUTE)]],
            second: [{ value: null, disabled: this.disabled }, [Validators.required, Validators.pattern(PATTERN_INPUT_SECOND)]]
        });
    }
    ngOnInit() {
        this.form.valueChanges.pipe(takeUntil(this._destroyed), debounceTime(400)).subscribe(val => {
            this._updateModel();
        });
    }
    ngOnChanges(changes) {
        if (changes.disabled || changes.disableMinute) {
            this._setDisableStates();
        }
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * Writes a new value to the element.
     * @param obj
     */
    writeValue(val) {
        if (val != null) {
            this._model = val;
            this._updateHourMinuteSecond();
        }
    }
    /** Registers a callback function that is called when the control's value changes in the UI. */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /** Enables or disables the appropriate DOM element */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this.cd.markForCheck();
    }
    /**
     * Format input
     * @param input
     */
    formatInput(input) {
        input.value = input.value.replace(NUMERIC_REGEX, '');
    }
    /** Toggle meridian */
    toggleMeridian() {
        this.meridian = (this.meridian === MERIDIANS.AM) ? MERIDIANS.PM : MERIDIANS.AM;
        this.change('hour');
    }
    /** Change property of time */
    change(prop, up) {
        const next = this._getNextValueByProp(prop, up);
        this.form.controls[prop].setValue(formatTwoDigitTimeValue(next), { onlySelf: false, emitEvent: false });
        this._updateModel();
    }
    /** Update controls of form by model */
    _updateHourMinuteSecond() {
        let _hour = this._dateAdapter.getHour(this._model);
        const _minute = this._dateAdapter.getMinute(this._model);
        const _second = this._dateAdapter.getSecond(this._model);
        if (this.enableMeridian) {
            if (_hour >= LIMIT_TIMES.meridian) {
                _hour = _hour - LIMIT_TIMES.meridian;
                this.meridian = MERIDIANS.PM;
            }
            else {
                this.meridian = MERIDIANS.AM;
            }
            if (_hour === 0) {
                _hour = LIMIT_TIMES.meridian;
            }
        }
        this.form.patchValue({
            hour: formatTwoDigitTimeValue(_hour),
            minute: formatTwoDigitTimeValue(_minute),
            second: formatTwoDigitTimeValue(_second)
        }, {
            emitEvent: false
        });
    }
    /** Update model */
    _updateModel() {
        let _hour = this.hour;
        if (this.enableMeridian) {
            if (this.meridian === MERIDIANS.AM && _hour === LIMIT_TIMES.meridian) {
                _hour = 0;
            }
            else if (this.meridian === MERIDIANS.PM && _hour !== LIMIT_TIMES.meridian) {
                _hour = _hour + LIMIT_TIMES.meridian;
            }
        }
        if (this._model) {
            const clonedModel = this._dateAdapter.clone(this._model);
            this._dateAdapter.setHour(clonedModel, _hour);
            this._dateAdapter.setMinute(clonedModel, this.minute);
            this._dateAdapter.setSecond(clonedModel, this.second);
            this._onChange(clonedModel);
        }
    }
    /**
     * Get next value by property
     * @param prop
     * @param up
     */
    _getNextValueByProp(prop, up) {
        const keyProp = prop[0].toUpperCase() + prop.slice(1);
        const min = LIMIT_TIMES[`min${keyProp}`];
        let max = LIMIT_TIMES[`max${keyProp}`];
        if (prop === 'hour' && this.enableMeridian) {
            max = LIMIT_TIMES.meridian;
        }
        let next;
        if (up == null) {
            next = this[prop] % (max);
            if (prop === 'hour' && this.enableMeridian) {
                if (next === 0)
                    next = max;
            }
        }
        else {
            next = up ? this[prop] + this[`step${keyProp}`] : this[prop] - this[`step${keyProp}`];
            if (prop === 'hour' && this.enableMeridian) {
                next = next % (max + 1);
                if (next === 0)
                    next = up ? 1 : max;
            }
            else {
                next = next % max;
            }
            if (up) {
                next = next > max ? (next - max + min) : next;
            }
            else {
                next = next < min ? (next - min + max) : next;
            }
        }
        return next;
    }
    /**
     * Set disable states
     */
    _setDisableStates() {
        if (this.disabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
            if (this.disableMinute) {
                this.form.get('minute').disable();
                if (this.showSeconds) {
                    this.form.get('second').disable();
                }
            }
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatTimepickerComponent, deps: [{ token: i1.NgxMatDateAdapter, optional: true }, { token: i0.ChangeDetectorRef }, { token: i2.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    /** @nocollapse */ static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.2", type: NgxMatTimepickerComponent, selector: "ngx-mat-timepicker", inputs: { disabled: "disabled", showSpinners: "showSpinners", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond", showSeconds: "showSeconds", disableMinute: "disableMinute", enableMeridian: "enableMeridian", defaultTime: "defaultTime", color: "color" }, host: { classAttribute: "ngx-mat-timepicker" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef((() => NgxMatTimepickerComponent)),
                multi: true
            }
        ], exportAs: ["ngxMatTimepicker"], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"form\">\n  <table class=\"ngx-mat-timepicker-table\">\n    <tbody class=\"ngx-mat-timepicker-tbody\">\n      <tr *ngIf=\"showSpinners\">\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('hour', true)\"\n            [disabled]=\"disabled\">\n            <mat-icon>expand_less</mat-icon>\n          </button>\n        </td>\n        <td></td>\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('minute', true)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_less</mat-icon>\n          </button> </td>\n        <td></td>\n        <td *ngIf=\"showSeconds\">\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('second', true)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_less</mat-icon>\n          </button>\n        </td>\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\n        <td *ngIf=\"enableMeridian\"></td>\n      </tr>\n\n      <tr>\n        <td>\n          <mat-form-field appearance=\"fill\" [color]=\"color\">\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\" formControlName=\"hour\"\n              (keydown.ArrowUp)=\"change('hour', true); $event.preventDefault()\"\n              (keydown.ArrowDown)=\"change('hour', false); $event.preventDefault()\" (blur)=\"change('hour')\">\n          </mat-form-field>\n        </td>\n        <td class=\"ngx-mat-timepicker-spacer\">&#58;</td>\n        <td>\n          <mat-form-field appearance=\"fill\" [color]=\"color\">\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\"\n              formControlName=\"minute\" (keydown.ArrowUp)=\"change('minute', true); $event.preventDefault()\"\n              (keydown.ArrowDown)=\"change('minute', false); $event.preventDefault()\" (blur)=\"change('minute')\">\n          </mat-form-field>\n        </td>\n        <td *ngIf=\"showSeconds\" class=\"ngx-mat-timepicker-spacer\">&#58;</td>\n        <td *ngIf=\"showSeconds\">\n          <mat-form-field appearance=\"fill\" [color]=\"color\">\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\"\n              formControlName=\"second\" (keydown.ArrowUp)=\"change('second', true); $event.preventDefault()\"\n              (keydown.ArrowDown)=\"change('second', false); $event.preventDefault()\" (blur)=\"change('second')\">\n          </mat-form-field>\n        </td>\n\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-meridian\">\n          <button mat-button (click)=\"toggleMeridian()\" mat-stroked-button [color]=\"color\" [disabled]=\"disabled\">\n            {{meridian}}\n          </button>\n        </td>\n      </tr>\n\n      <tr *ngIf=\"showSpinners\">\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('hour', false)\"\n            [disabled]=\"disabled\">\n            <mat-icon>expand_more</mat-icon>\n          </button> </td>\n        <td></td>\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('minute', false)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_more</mat-icon>\n          </button> </td>\n        <td *ngIf=\"showSeconds\"></td>\n        <td *ngIf=\"showSeconds\">\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('second', false)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_more</mat-icon>\n          </button>\n        </td>\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\n        <td *ngIf=\"enableMeridian\"></td>\n      </tr>\n    </tbody>\n  </table>\n</form>", styles: [".ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td{text-align:center}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-spacer{font-weight:700}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-meridian .mdc-button{min-width:64px;line-height:36px;min-width:0;border-radius:50%;width:36px;height:36px;padding:0;flex-shrink:0}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-icon-button{height:24px;width:24px;line-height:24px;padding:0}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-icon-button .mat-icon{font-size:24px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field{width:24px;max-width:24px;text-align:center}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field.mat-focused .mdc-text-field--filled .mat-mdc-form-field-focus-overlay,.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field:hover .mdc-text-field--filled .mat-mdc-form-field-focus-overlay{background-color:transparent}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field .mdc-text-field--filled{background-color:transparent!important;padding:0!important}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field .mdc-text-field--filled .mat-mdc-form-field-infix{padding:4px 0;min-height:1px!important}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field .mdc-text-field--filled .mat-mdc-form-field-infix input{text-align:center;font-size:14px}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i5.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i7.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i7.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2", ngImport: i0, type: NgxMatTimepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-mat-timepicker', host: {
                        'class': 'ngx-mat-timepicker'
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((() => NgxMatTimepickerComponent)),
                            multi: true
                        }
                    ], exportAs: 'ngxMatTimepicker', encapsulation: ViewEncapsulation.None, template: "<form [formGroup]=\"form\">\n  <table class=\"ngx-mat-timepicker-table\">\n    <tbody class=\"ngx-mat-timepicker-tbody\">\n      <tr *ngIf=\"showSpinners\">\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('hour', true)\"\n            [disabled]=\"disabled\">\n            <mat-icon>expand_less</mat-icon>\n          </button>\n        </td>\n        <td></td>\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('minute', true)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_less</mat-icon>\n          </button> </td>\n        <td></td>\n        <td *ngIf=\"showSeconds\">\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('second', true)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_less</mat-icon>\n          </button>\n        </td>\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\n        <td *ngIf=\"enableMeridian\"></td>\n      </tr>\n\n      <tr>\n        <td>\n          <mat-form-field appearance=\"fill\" [color]=\"color\">\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\" formControlName=\"hour\"\n              (keydown.ArrowUp)=\"change('hour', true); $event.preventDefault()\"\n              (keydown.ArrowDown)=\"change('hour', false); $event.preventDefault()\" (blur)=\"change('hour')\">\n          </mat-form-field>\n        </td>\n        <td class=\"ngx-mat-timepicker-spacer\">&#58;</td>\n        <td>\n          <mat-form-field appearance=\"fill\" [color]=\"color\">\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\"\n              formControlName=\"minute\" (keydown.ArrowUp)=\"change('minute', true); $event.preventDefault()\"\n              (keydown.ArrowDown)=\"change('minute', false); $event.preventDefault()\" (blur)=\"change('minute')\">\n          </mat-form-field>\n        </td>\n        <td *ngIf=\"showSeconds\" class=\"ngx-mat-timepicker-spacer\">&#58;</td>\n        <td *ngIf=\"showSeconds\">\n          <mat-form-field appearance=\"fill\" [color]=\"color\">\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\"\n              formControlName=\"second\" (keydown.ArrowUp)=\"change('second', true); $event.preventDefault()\"\n              (keydown.ArrowDown)=\"change('second', false); $event.preventDefault()\" (blur)=\"change('second')\">\n          </mat-form-field>\n        </td>\n\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-meridian\">\n          <button mat-button (click)=\"toggleMeridian()\" mat-stroked-button [color]=\"color\" [disabled]=\"disabled\">\n            {{meridian}}\n          </button>\n        </td>\n      </tr>\n\n      <tr *ngIf=\"showSpinners\">\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('hour', false)\"\n            [disabled]=\"disabled\">\n            <mat-icon>expand_more</mat-icon>\n          </button> </td>\n        <td></td>\n        <td>\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('minute', false)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_more</mat-icon>\n          </button> </td>\n        <td *ngIf=\"showSeconds\"></td>\n        <td *ngIf=\"showSeconds\">\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('second', false)\"\n            [disabled]=\"disabled || disableMinute\">\n            <mat-icon>expand_more</mat-icon>\n          </button>\n        </td>\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\n        <td *ngIf=\"enableMeridian\"></td>\n      </tr>\n    </tbody>\n  </table>\n</form>", styles: [".ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td{text-align:center}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-spacer{font-weight:700}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-meridian .mdc-button{min-width:64px;line-height:36px;min-width:0;border-radius:50%;width:36px;height:36px;padding:0;flex-shrink:0}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-icon-button{height:24px;width:24px;line-height:24px;padding:0}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-icon-button .mat-icon{font-size:24px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field{width:24px;max-width:24px;text-align:center}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field.mat-focused .mdc-text-field--filled .mat-mdc-form-field-focus-overlay,.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field:hover .mdc-text-field--filled .mat-mdc-form-field-focus-overlay{background-color:transparent}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field .mdc-text-field--filled{background-color:transparent!important;padding:0!important}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field .mdc-text-field--filled .mat-mdc-form-field-infix{padding:4px 0;min-height:1px!important}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-mdc-form-field .mdc-text-field--filled .mat-mdc-form-field-infix input{text-align:center;font-size:14px}\n"] }]
        }], ctorParameters: () => [{ type: i1.NgxMatDateAdapter, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }, { type: i2.FormBuilder }], propDecorators: { disabled: [{
                type: Input
            }], showSpinners: [{
                type: Input
            }], stepHour: [{
                type: Input
            }], stepMinute: [{
                type: Input
            }], stepSecond: [{
                type: Input
            }], showSeconds: [{
                type: Input
            }], disableMinute: [{
                type: Input
            }], enableMeridian: [{
                type: Input
            }], defaultTime: [{
                type: Input
            }], color: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYXRldGltZS1waWNrZXIvc3JjL2xpYi90aW1lcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGV0aW1lLXBpY2tlci9zcmMvbGliL3RpbWVwaWNrZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsUUFBUSxFQUFpQixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSSxPQUFPLEVBQWdELGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxPQUFPLEVBQ0wsMEJBQTBCLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUNqRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFDdEcsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7O0FBbUI1QixNQUFNLE9BQU8seUJBQXlCO0lBaUJwQyxXQUFXO0lBQ1gsSUFBWSxJQUFJO1FBQ2QsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLElBQVksTUFBTTtRQUNoQixJQUFJLEdBQUcsR0FBRyxN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QUFFLENBQUM7Z0JBQ2xDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztpSUF6T1UseUJBQXlCO3FIQUF6Qix5QkFBeUIsaVhBVnpCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsRUFBQztnQkFDeEQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLCtFQ3hCSCw4L0hBb0ZPOzsyRkR4RE0seUJBQXlCO2tCQWpCckMsU0FBUzsrQkFDRSxvQkFBb0IsUUFHeEI7d0JBQ0osT0FBTyxFQUFFLG9CQUFvQjtxQkFDOUIsYUFDVTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxFQUFDLEdBQUcsRUFBRSwwQkFBMEIsRUFBQzs0QkFDeEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0YsWUFDUyxrQkFBa0IsaUJBQ2IsaUJBQWlCLENBQUMsSUFBSTs7MEJBaUR4QixRQUFRO21HQTNDWixRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE9wdGlvbmFsLCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5neE1hdERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQge1xuICBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciwgREVGQVVMVF9TVEVQLCBmb3JtYXRUd29EaWdpdFRpbWVWYWx1ZSxcbiAgTElNSVRfVElNRVMsIE1FUklESUFOUywgTlVNRVJJQ19SRUdFWCwgUEFUVEVSTl9JTlBVVF9IT1VSLCBQQVRURVJOX0lOUFVUX01JTlVURSwgUEFUVEVSTl9JTlBVVF9TRUNPTkRcbn0gZnJvbSAnLi91dGlscy9kYXRlLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LW1hdC10aW1lcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbmd4LW1hdC10aW1lcGlja2VyJ1xuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neE1hdFRpbWVwaWNrZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF0sXG4gIGV4cG9ydEFzOiAnbmd4TWF0VGltZXBpY2tlcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdFRpbWVwaWNrZXJDb21wb25lbnQ8RD4gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1NwaW5uZXJzID0gdHJ1ZTtcbiAgQElucHV0KCkgc3RlcEhvdXI6IG51bWJlciA9IERFRkFVTFRfU1RFUDtcbiAgQElucHV0KCkgc3RlcE1pbnV0ZTogbnVtYmVyID0gREVGQVVMVF9TVEVQO1xuICBASW5wdXQoKSBzdGVwU2Vjb25kOiBudW1iZXIgPSBERUZBVUxUX1NURVA7XG4gIEBJbnB1dCgpIHNob3dTZWNvbmRzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVNaW51dGUgPSBmYWxzZTtcbiAgQElucHV0KCkgZW5hYmxlTWVyaWRpYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGVmYXVsdFRpbWU6IG51bWJlcltdO1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gJ3ByaW1hcnknO1xuXG4gIHB1YmxpYyBtZXJpZGlhbjogc3RyaW5nID0gTUVSSURJQU5TLkFNO1xuXG4gIC8qKiBIb3VyICovXG4gIHByaXZhdGUgZ2V0IGhvdXIoKSB7XG4gICAgbGV0IHZhbCA9IE51bWJlcih0aGlzLmZvcm0uY29udHJvbHNbJ2hvdXInXS52YWx1ZSk7XG4gICAgcmV0dXJuIGlzTmFOKHZhbCkgPyAwIDogdmFsO1xuICB9O1xuXG4gIHByaXZhdGUgZ2V0IG1pbnV0ZSgpIHtcbiAgICBsZXQgdmFsID0gTnVtYmVyKHRoaXMuZm9ybS5jb250cm9sc1snbWludXRlJ10udmFsdWUpO1xuICAgIHJldHVybiBpc05hTih2YWwpID8gMCA6IHZhbDtcbiAgfTtcblxuICBwcml2YXRlIGdldCBzZWNvbmQoKSB7XG4gICAgbGV0IHZhbCA9IE51bWJlcih0aGlzLmZvcm0uY29udHJvbHNbJ3NlY29uZCddLnZhbHVlKTtcbiAgICByZXR1cm4gaXNOYU4odmFsKSA/IDAgOiB2YWw7XG4gIH07XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBmb3JtIGlzIHZhbGlkICovXG4gIHB1YmxpYyBnZXQgdmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgX29uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gIHByaXZhdGUgX29uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfbW9kZWw6IEQ7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwdWJsaWMgcGF0dGVybiA9IFBBVFRFUk5fSU5QVVRfSE9VUjtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwdWJsaWMgX2RhdGVBZGFwdGVyOiBOZ3hNYXREYXRlQWRhcHRlcjxEPixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTmd4TWF0RGF0ZUFkYXB0ZXInKTtcbiAgICB9XG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cChcbiAgICAgIHtcbiAgICAgICAgaG91cjogW3sgdmFsdWU6IG51bGwsIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkIH0sIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLnBhdHRlcm4oUEFUVEVSTl9JTlBVVF9IT1VSKV1dLFxuICAgICAgICBtaW51dGU6IFt7IHZhbHVlOiBudWxsLCBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCB9LCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKFBBVFRFUk5fSU5QVVRfTUlOVVRFKV1dLFxuICAgICAgICBzZWNvbmQ6IFt7IHZhbHVlOiBudWxsLCBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCB9LCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKFBBVFRFUk5fSU5QVVRfU0VDT05EKV1dXG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSwgZGVib3VuY2VUaW1lKDQwMCkpLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgdGhpcy5fdXBkYXRlTW9kZWwoKTtcbiAgICB9KVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkIHx8IGNoYW5nZXMuZGlzYWJsZU1pbnV0ZSkge1xuICAgICAgdGhpcy5fc2V0RGlzYWJsZVN0YXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGEgbmV3IHZhbHVlIHRvIHRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gb2JqXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbDogRCk6IHZvaWQge1xuICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbW9kZWwgPSB2YWw7XG4gICAgICB0aGlzLl91cGRhdGVIb3VyTWludXRlU2Vjb25kKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKiogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCdzIHZhbHVlIGNoYW5nZXMgaW4gdGhlIFVJLiAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCByZWNlaXZlcyBhIHRvdWNoIGV2ZW50LlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKiogRW5hYmxlcyBvciBkaXNhYmxlcyB0aGUgYXBwcm9wcmlhdGUgRE9NIGVsZW1lbnQgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGlucHV0XG4gICAqIEBwYXJhbSBpbnB1dCBcbiAgICovXG4gIHB1YmxpYyBmb3JtYXRJbnB1dChpbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUucmVwbGFjZShOVU1FUklDX1JFR0VYLCAnJyk7XG4gIH1cblxuICAvKiogVG9nZ2xlIG1lcmlkaWFuICovXG4gIHB1YmxpYyB0b2dnbGVNZXJpZGlhbigpIHtcbiAgICB0aGlzLm1lcmlkaWFuID0gKHRoaXMubWVyaWRpYW4gPT09IE1FUklESUFOUy5BTSkgPyBNRVJJRElBTlMuUE0gOiBNRVJJRElBTlMuQU07XG4gICAgdGhpcy5jaGFuZ2UoJ2hvdXInKTtcbiAgfVxuXG4gIC8qKiBDaGFuZ2UgcHJvcGVydHkgb2YgdGltZSAqL1xuICBwdWJsaWMgY2hhbmdlKHByb3A6IHN0cmluZywgdXA/OiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV4dCA9IHRoaXMuX2dldE5leHRWYWx1ZUJ5UHJvcChwcm9wLCB1cCk7XG4gICAgdGhpcy5mb3JtLmNvbnRyb2xzW3Byb3BdLnNldFZhbHVlKGZvcm1hdFR3b0RpZ2l0VGltZVZhbHVlKG5leHQpLCB7IG9ubHlTZWxmOiBmYWxzZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICB0aGlzLl91cGRhdGVNb2RlbCgpO1xuICB9XG5cbiAgLyoqIFVwZGF0ZSBjb250cm9scyBvZiBmb3JtIGJ5IG1vZGVsICovXG4gIHByaXZhdGUgX3VwZGF0ZUhvdXJNaW51dGVTZWNvbmQoKSB7XG4gICAgbGV0IF9ob3VyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cih0aGlzLl9tb2RlbCk7XG4gICAgY29uc3QgX21pbnV0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZSh0aGlzLl9tb2RlbCk7XG4gICAgY29uc3QgX3NlY29uZCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFNlY29uZCh0aGlzLl9tb2RlbCk7XG5cbiAgICBpZiAodGhpcy5lbmFibGVNZXJpZGlhbikge1xuICAgICAgaWYgKF9ob3VyID49IExJTUlUX1RJTUVTLm1lcmlkaWFuKSB7XG4gICAgICAgIF9ob3VyID0gX2hvdXIgLSBMSU1JVF9USU1FUy5tZXJpZGlhbjtcbiAgICAgICAgdGhpcy5tZXJpZGlhbiA9IE1FUklESUFOUy5QTTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWVyaWRpYW4gPSBNRVJJRElBTlMuQU07XG4gICAgICB9XG4gICAgICBpZiAoX2hvdXIgPT09IDApIHtcbiAgICAgICAgX2hvdXIgPSBMSU1JVF9USU1FUy5tZXJpZGlhbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICBob3VyOiBmb3JtYXRUd29EaWdpdFRpbWVWYWx1ZShfaG91ciksXG4gICAgICBtaW51dGU6IGZvcm1hdFR3b0RpZ2l0VGltZVZhbHVlKF9taW51dGUpLFxuICAgICAgc2Vjb25kOiBmb3JtYXRUd29EaWdpdFRpbWVWYWx1ZShfc2Vjb25kKVxuICAgIH0sIHtcbiAgICAgIGVtaXRFdmVudDogZmFsc2VcbiAgICB9KVxuXG4gIH1cblxuICAvKiogVXBkYXRlIG1vZGVsICovXG4gIHByaXZhdGUgX3VwZGF0ZU1vZGVsKCkge1xuICAgIGxldCBfaG91ciA9IHRoaXMuaG91cjtcblxuICAgIGlmICh0aGlzLmVuYWJsZU1lcmlkaWFuKSB7XG4gICAgICBpZiAodGhpcy5tZXJpZGlhbiA9PT0gTUVSSURJQU5TLkFNICYmIF9ob3VyID09PSBMSU1JVF9USU1FUy5tZXJpZGlhbikge1xuICAgICAgICBfaG91ciA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWVyaWRpYW4gPT09IE1FUklESUFOUy5QTSAmJiBfaG91ciAhPT0gTElNSVRfVElNRVMubWVyaWRpYW4pIHtcbiAgICAgICAgX2hvdXIgPSBfaG91ciArIExJTUlUX1RJTUVTLm1lcmlkaWFuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2RlbCkge1xuICAgICAgY29uc3QgY2xvbmVkTW9kZWwgPSB0aGlzLl9kYXRlQWRhcHRlci5jbG9uZSh0aGlzLl9tb2RlbCk7XG5cbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLnNldEhvdXIoY2xvbmVkTW9kZWwsIF9ob3VyKTtcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLnNldE1pbnV0ZShjbG9uZWRNb2RlbCwgdGhpcy5taW51dGUpO1xuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuc2V0U2Vjb25kKGNsb25lZE1vZGVsLCB0aGlzLnNlY29uZCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZShjbG9uZWRNb2RlbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBuZXh0IHZhbHVlIGJ5IHByb3BlcnR5XG4gICAqIEBwYXJhbSBwcm9wIFxuICAgKiBAcGFyYW0gdXBcbiAgICovXG4gIHByaXZhdGUgX2dldE5leHRWYWx1ZUJ5UHJvcChwcm9wOiBzdHJpbmcsIHVwPzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3Qga2V5UHJvcCA9IHByb3BbMF0udG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSk7XG4gICAgY29uc3QgbWluID0gTElNSVRfVElNRVNbYG1pbiR7a2V5UHJvcH1gXTtcbiAgICBsZXQgbWF4ID0gTElNSVRfVElNRVNbYG1heCR7a2V5UHJvcH1gXTtcblxuICAgIGlmIChwcm9wID09PSAnaG91cicgJiYgdGhpcy5lbmFibGVNZXJpZGlhbikge1xuICAgICAgbWF4ID0gTElNSVRfVElNRVMubWVyaWRpYW47XG4gICAgfVxuXG4gICAgbGV0IG5leHQ7XG4gICAgaWYgKHVwID09IG51bGwpIHtcbiAgICAgIG5leHQgPSB0aGlzW3Byb3BdICUgKG1heCk7XG4gICAgICBpZiAocHJvcCA9PT0gJ2hvdXInICYmIHRoaXMuZW5hYmxlTWVyaWRpYW4pIHtcbiAgICAgICAgaWYgKG5leHQgPT09IDApIG5leHQgPSBtYXg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQgPSB1cCA/IHRoaXNbcHJvcF0gKyB0aGlzW2BzdGVwJHtrZXlQcm9wfWBdIDogdGhpc1twcm9wXSAtIHRoaXNbYHN0ZXAke2tleVByb3B9YF07XG4gICAgICBpZiAocHJvcCA9PT0gJ2hvdXInICYmIHRoaXMuZW5hYmxlTWVyaWRpYW4pIHtcbiAgICAgICAgbmV4dCA9IG5leHQgJSAobWF4ICsgMSk7XG4gICAgICAgIGlmIChuZXh0ID09PSAwKSBuZXh0ID0gdXAgPyAxIDogbWF4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCA9IG5leHQgJSBtYXg7XG4gICAgICB9XG4gICAgICBpZiAodXApIHtcbiAgICAgICAgbmV4dCA9IG5leHQgPiBtYXggPyAobmV4dCAtIG1heCArIG1pbikgOiBuZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCA9IG5leHQgPCBtaW4gPyAobmV4dCAtIG1pbiArIG1heCkgOiBuZXh0O1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRpc2FibGUgc3RhdGVzXG4gICAqL1xuICBwcml2YXRlIF9zZXREaXNhYmxlU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmZvcm0uZGlzYWJsZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybS5lbmFibGUoKTtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVNaW51dGUpIHtcbiAgICAgICAgdGhpcy5mb3JtLmdldCgnbWludXRlJykuZGlzYWJsZSgpO1xuICAgICAgICBpZiAodGhpcy5zaG93U2Vjb25kcykge1xuICAgICAgICAgIHRoaXMuZm9ybS5nZXQoJ3NlY29uZCcpLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgPHRhYmxlIGNsYXNzPVwibmd4LW1hdC10aW1lcGlja2VyLXRhYmxlXCI+XG4gICAgPHRib2R5IGNsYXNzPVwibmd4LW1hdC10aW1lcGlja2VyLXRib2R5XCI+XG4gICAgICA8dHIgKm5nSWY9XCJzaG93U3Bpbm5lcnNcIj5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiZXhwYW5kX2xlc3MgaWNvblwiIChjbGljayk9XCJjaGFuZ2UoJ2hvdXInLCB0cnVlKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5leHBhbmRfbGVzczwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZD48L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJleHBhbmRfbGVzcyBpY29uXCIgKGNsaWNrKT1cImNoYW5nZSgnbWludXRlJywgdHJ1ZSlcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGRpc2FibGVNaW51dGVcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5leHBhbmRfbGVzczwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+IDwvdGQ+XG4gICAgICAgIDx0ZD48L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiZXhwYW5kX2xlc3MgaWNvblwiIChjbGljayk9XCJjaGFuZ2UoJ3NlY29uZCcsIHRydWUpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBkaXNhYmxlTWludXRlXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+ZXhwYW5kX2xlc3M8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJlbmFibGVNZXJpZGlhblwiIGNsYXNzPVwibmd4LW1hdC10aW1lcGlja2VyLXNwYWNlclwiPjwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cImVuYWJsZU1lcmlkaWFuXCI+PC90ZD5cbiAgICAgIDwvdHI+XG5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBhcHBlYXJhbmNlPVwiZmlsbFwiIFtjb2xvcl09XCJjb2xvclwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgKGlucHV0KT1cImZvcm1hdElucHV0KCRhbnkoJGV2ZW50KS50YXJnZXQpXCIgbWF4bGVuZ3RoPVwiMlwiIGZvcm1Db250cm9sTmFtZT1cImhvdXJcIlxuICAgICAgICAgICAgICAoa2V5ZG93bi5BcnJvd1VwKT1cImNoYW5nZSgnaG91cicsIHRydWUpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2UoJ2hvdXInLCBmYWxzZSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgKGJsdXIpPVwiY2hhbmdlKCdob3VyJylcIj5cbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJuZ3gtbWF0LXRpbWVwaWNrZXItc3BhY2VyXCI+JiM1ODs8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGFwcGVhcmFuY2U9XCJmaWxsXCIgW2NvbG9yXT1cImNvbG9yXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBtYXRJbnB1dCAoaW5wdXQpPVwiZm9ybWF0SW5wdXQoJGFueSgkZXZlbnQpLnRhcmdldClcIiBtYXhsZW5ndGg9XCIyXCJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwibWludXRlXCIgKGtleWRvd24uQXJyb3dVcCk9XCJjaGFuZ2UoJ21pbnV0ZScsIHRydWUpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2UoJ21pbnV0ZScsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiAoYmx1cik9XCJjaGFuZ2UoJ21pbnV0ZScpXCI+XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkICpuZ0lmPVwic2hvd1NlY29uZHNcIiBjbGFzcz1cIm5neC1tYXQtdGltZXBpY2tlci1zcGFjZXJcIj4mIzU4OzwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+XG4gICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGFwcGVhcmFuY2U9XCJmaWxsXCIgW2NvbG9yXT1cImNvbG9yXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBtYXRJbnB1dCAoaW5wdXQpPVwiZm9ybWF0SW5wdXQoJGFueSgkZXZlbnQpLnRhcmdldClcIiBtYXhsZW5ndGg9XCIyXCJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwic2Vjb25kXCIgKGtleWRvd24uQXJyb3dVcCk9XCJjaGFuZ2UoJ3NlY29uZCcsIHRydWUpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2UoJ3NlY29uZCcsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiAoYmx1cik9XCJjaGFuZ2UoJ3NlY29uZCcpXCI+XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC90ZD5cblxuICAgICAgICA8dGQgKm5nSWY9XCJlbmFibGVNZXJpZGlhblwiIGNsYXNzPVwibmd4LW1hdC10aW1lcGlja2VyLXNwYWNlclwiPjwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cImVuYWJsZU1lcmlkaWFuXCIgY2xhc3M9XCJuZ3gtbWF0LXRpbWVwaWNrZXItbWVyaWRpYW5cIj5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cInRvZ2dsZU1lcmlkaWFuKClcIiBtYXQtc3Ryb2tlZC1idXR0b24gW2NvbG9yXT1cImNvbG9yXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICB7e21lcmlkaWFufX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG5cbiAgICAgIDx0ciAqbmdJZj1cInNob3dTcGlubmVyc1wiPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJleHBhbmRfbW9yZSBpY29uXCIgKGNsaWNrKT1cImNoYW5nZSgnaG91cicsIGZhbHNlKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5leHBhbmRfbW9yZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+IDwvdGQ+XG4gICAgICAgIDx0ZD48L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJleHBhbmRfbW9yZSBpY29uXCIgKGNsaWNrKT1cImNoYW5nZSgnbWludXRlJywgZmFsc2UpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBkaXNhYmxlTWludXRlXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+ZXhwYW5kX21vcmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPiA8L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJzaG93U2Vjb25kc1wiPjwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJleHBhbmRfbW9yZSBpY29uXCIgKGNsaWNrKT1cImNoYW5nZSgnc2Vjb25kJywgZmFsc2UpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBkaXNhYmxlTWludXRlXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+ZXhwYW5kX21vcmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJlbmFibGVNZXJpZGlhblwiIGNsYXNzPVwibmd4LW1hdC10aW1lcGlja2VyLXNwYWNlclwiPjwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cImVuYWJsZU1lcmlkaWFuXCI+PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvZm9ybT4iXX0=