import { Component } from '@angular/core';
import { StatusWithProject } from '@rucken/todo-core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptFormModalComponent } from '@rucken/web';

@Component({
  selector: 'status-modal',
  templateUrl: './status-modal.component.html'
})
export class StatusModalComponent extends BasePromptFormModalComponent<StatusWithProject> {

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
    this.group(StatusWithProject);
  }
}
