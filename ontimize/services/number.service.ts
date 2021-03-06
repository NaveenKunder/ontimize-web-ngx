import { Injector } from '@angular/core';
import { AppConfig, Config } from '../config/app-config';

export class NumberService {

  public static DEFAULT_DECIMAL_DIGITS = 2;

  protected _grouping: boolean;
  protected _decimalDigits: number;
  protected _locale: string;
  private _config: Config;

  constructor(protected injector: Injector) {
    this._config = this.injector.get(AppConfig).getConfiguration();
    //TODO: initialize from config
    this._decimalDigits = NumberService.DEFAULT_DECIMAL_DIGITS;

    this._grouping = true;
    this._locale = this._config.locale;
  }

  public get grouping(): boolean {
    return this._grouping;
  }

  public set grouping(value: boolean) {
    this._grouping = value;
  }

  public get decimalDigits(): number {
    return this._decimalDigits;
  }

  public set decimalDigits(value: number) {
    this._decimalDigits = value;
  }

  public get locale(): string {
    return this._locale;
  }

  public set locale(value: string) {
    this._locale = value;
  }

  public getIntegerValue(value: any, grouping?: boolean, thousandSeparator?: string, locale?: string) {
    if (typeof grouping === 'undefined' || !grouping || typeof value === 'undefined') {
      return value;
    }
    let formattedIntValue = value;
    if (typeof (locale) !== 'undefined') {
      formattedIntValue = new Intl.NumberFormat(locale).format(value);
    } else if (typeof (thousandSeparator) === 'undefined') {
      formattedIntValue = new Intl.NumberFormat(this._locale).format(value);
    } else {
      let intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        intValue = 0;
      }
      formattedIntValue = String(intValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    }
    return formattedIntValue;
  }

  public getRealValue(value: any, grouping?: boolean, thousandSeparator?: string,
    decimalSeparator?: string, decimalDigits?: number, locale?: string) {
    if (typeof grouping === 'undefined' || !grouping || typeof value === 'undefined') {
      return value;
    }
    if (typeof (decimalDigits) === 'undefined') {
      decimalDigits = this._decimalDigits;
    }

    let formattedRealValue = value;
    let formatterArgs = {
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits
    };

    if (typeof (locale) !== 'undefined') {
      formattedRealValue = new Intl.NumberFormat(locale, formatterArgs).format(value);
    } else if (typeof (thousandSeparator) === 'undefined' || typeof (decimalSeparator) === 'undefined') {
      formattedRealValue = new Intl.NumberFormat(this._locale, formatterArgs).format(value);
    } else {
      let realValue = parseFloat(value);
      if (isNaN(realValue)) {
        realValue = 0;
      }
      formattedRealValue = String(realValue);
      let tmpStr = realValue.toFixed(decimalDigits);
      tmpStr = tmpStr.replace('.', decimalSeparator);
      if (grouping) {
        let parts = tmpStr.split(decimalSeparator);
        if (parts.length > 0) {
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
          formattedRealValue = parts.join(decimalSeparator);
        }
      } else {
        formattedRealValue = tmpStr;
      }
    }
    return formattedRealValue;
  }

  public getPercentValue(value: any, grouping?: boolean, thousandSeparator?: string,
    decimalSeparator?: string, decimalDigits?: number, locale?: string) {
    let formattedPercentValue = value;
    value = value * 100;

    formattedPercentValue = this.getRealValue(value, grouping, thousandSeparator, decimalSeparator, decimalDigits)+' %';
    return formattedPercentValue;

  }

}
