import {
  Injector,
  ElementRef,
  Renderer,
  EventEmitter
} from '@angular/core';

import { OListItemComponent } from '../list-item/o-list-item.component';

export const DEFAULT_INPUTS_O_TEXT_RENDERER = [
  'title',
  'primaryText : primary-text',
  'secondaryText : secondary-text',
  'icon'
];

export const DEFAULT_OUTPUTS_O_TEXT_RENDERER = [
  'onIconClick : icon-action'
];

export class OListItemTextRenderer {

  public static DEFAULT_INPUTS_O_TEXT_RENDERER = DEFAULT_INPUTS_O_TEXT_RENDERER;
  public static DEFAULT_OUTPUTS_O_TEXT_RENDERER = DEFAULT_OUTPUTS_O_TEXT_RENDERER;

  /* inputs variables */
  protected _title: string;
  protected _primaryText: string;
  protected _secondaryText: string;
  protected _icon: string;

  onIconClick: EventEmitter<Object> = new EventEmitter<Object>();
  /* end of inputs variables */

  private has3Lines: boolean = true;

  constructor(
    public elRef: ElementRef,
    protected _renderer: Renderer,
    protected _injector: Injector,
    protected _listItem: OListItemComponent
  ) {
  }

  modifyMdListItemElement() {
    if (this.elRef.nativeElement && this.elRef.nativeElement.parentElement) {
      let mdListItem = this.elRef.nativeElement.parentElement.parentElement;
      if (mdListItem && mdListItem.nodeName === 'MD-LIST-ITEM') {
        let mdLines = 3;
        if (this.title === undefined) {
          mdLines--;
        }
        if (this.primaryText === undefined) {
          mdLines--;
        }
        if (this.secondaryText === undefined) {
          mdLines--;
        }
        this.has3Lines = (mdLines === 3);
        mdListItem.classList.add('mat-' + mdLines + '-line');
        mdListItem.querySelector('.mat-list-text').remove();
      }
    }
  }

  onActionIconClick(event: any) {
    this.onIconClick.emit(event);
  }

  get title(): string {
    return this._title;
  }

  set title(val : string) {
    this._title = val;
  }

  get primaryText(): string {
    return this._primaryText;
  }

  set primaryText(val : string) {
    this._primaryText = val;
  }

  get secondaryText(): string {
    return this._secondaryText;
  }

  set secondaryText(val : string) {
    this._secondaryText= val;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(val : string) {
    this._icon = val;
  }
}
