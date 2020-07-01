export class NgxsForm {
  model: any = {};
  dirty: boolean = null;
  status: string = null;
  errors: any = {};

  constructor(model?: any) {
    if (model) {
      this.model = model;
    }
  }
}
