import { MatDialogConfig } from '@angular/material/dialog';

export class DialogBuilder {
  public title: string;
  public width: string;
  public datas: any;

  withTitle(value: string): DialogBuilder {
    this.title = value;
    return this;
  }

  withWidth(value: string): DialogBuilder {
    this.width = value;
    return this;
  }

  withDatas(value: any): DialogBuilder {
    this.datas = value;
    return this;
  }

  build() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = this.width;
    dialogConfig.data = {
      dialogTitle: this.title,
      datas: this.datas,
    };
    return dialogConfig;
  }
}
