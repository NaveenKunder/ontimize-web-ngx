import { Injectable, Injector } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { ODialogComponent, ODialogConfig } from '../components';

@Injectable()
export class DialogService {

  protected ng2Dialog: MdDialog;
  protected dialogRef: MdDialogRef<ODialogComponent>;

  constructor(protected injector: Injector) {
    this.ng2Dialog = this.injector.get(MdDialog);
  }

  public get dialog(): ODialogComponent {
    if (this.dialogRef) {
      return this.dialogRef.componentInstance;
    }
    return undefined;
  }

  public alert(title: string, message: string, config?: ODialogConfig): Promise<any> {
    var self = this;
    let observable = Observable.create(
      observer => {
        self.openDialog(observer);
        self.dialogRef.componentInstance.alert(title, message, config);
      }
    );
    return observable.toPromise();
  }

  public info(title: string, message: string, config?: ODialogConfig): Promise<any> {
    var self = this;
    let observable = Observable.create(
      observer => {
        self.openDialog(observer);
        self.dialogRef.componentInstance.info(title, message, config);
      }
    );
    return observable.toPromise();
  }

  public warn(title: string, message: string, config?: ODialogConfig): Promise<any> {
    var self = this;
    let observable = Observable.create(
      observer => {
        self.openDialog(observer);
        self.dialogRef.componentInstance.warn(title, message, config);
      }
    );
    return observable.toPromise();
  }

  public error(title: string, message: string, config?: ODialogConfig): Promise<any> {
    var self = this;
    let observable = Observable.create(
      observer => {
        self.openDialog(observer);
        self.dialogRef.componentInstance.error(title, message, config);
      }
    );
    return observable.toPromise();
  }

  public confirm(title: string, message: string, config?: ODialogConfig): Promise<any> {
    var self = this;
    let observable = Observable.create(
      observer => {
        self.openDialog(observer);
        self.dialogRef.componentInstance.confirm(title, message, config);
      }
    );
    return observable.toPromise();
  }

  protected openDialog(observer) {
    let cfg: MdDialogConfig = {
      role: 'alertdialog',
      disableClose: true
    };
    this.dialogRef = this.ng2Dialog.open(ODialogComponent, cfg);
    this.dialogRef.afterClosed().subscribe(result => {
      result = result === undefined ? false : result;
      observer.next(result);
      observer.complete();
      this.dialogRef = null;
    });
  }

}
