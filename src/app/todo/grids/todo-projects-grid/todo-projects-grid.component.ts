import { User } from 'rucken';
import { Subscription } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { TodoProject } from './../../shared/models/todo-project.model';
import { TodoProjectModalComponent } from './todo-project-modal/todo-project-modal.component';
import { ConfirmModalComponent } from 'rucken';
import { TodoProjectsService } from '../../shared/todo-projects.service';
import { AppService } from 'rucken';
import { AccountService } from 'rucken';
import { ResouceEnumStatus } from 'rucken';
import { MetaModel } from 'rucken';
import { BaseResourcesGridComponent } from 'rucken';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'todo-projects-grid',
  templateUrl: './todo-projects-grid.component.html',
  styleUrls: ['./todo-projects-grid.component.scss'],
  entryComponents: [TodoProjectModalComponent, ConfirmModalComponent]
})

export class TodoProjectsGridComponent extends BaseResourcesGridComponent {

  @Output()
  onSelectItems: EventEmitter<any[] | TodoProject[] | any>;
  @ViewChild('focusElement')
  focusElement: ElementRef;

  modelMeta: any = TodoProject.meta();
  items: any[] | TodoProject[];
  selectedItems: any[] | TodoProject[];
  cachedResourcesService: TodoProjectsService;

  constructor(
    public todoProjectsService: TodoProjectsService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = todoProjectsService.createCache();
  }
  get account(): User {
    return this.accountService.account;
  }
  get readonly() {
    return this.hardReadonly !== true || !this.account || !this.account.checkPermissions(['add_todo-project', 'change_todo-project', 'delete_todo-project']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: TodoProjectModalComponent = this.app.modals(this.resolver).create(TodoProjectModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.account || !this.account.checkPermissions(['add_todo-project']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new todo project');
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new TodoProject();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showEditModal(item: any | TodoProject) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: TodoProjectModalComponent = this.app.modals(this.resolver).create(TodoProjectModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.account || !this.account.checkPermissions(['change_todo-project']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit todo project');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Todo project info');
    }
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new TodoProject(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showRemoveModal(item: any | TodoProject) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a todo project?');
    confirm.onYes.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
  }
  save(itemModal: TodoProjectModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (todoProject: any | TodoProject) => {
        itemModal.modal.hide();
      }, (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              itemModal.info.emit({ name: '' });
            });
        } else {
          itemModal.errors.emit(errors);
        }
      });
  }
  remove(itemModal: ConfirmModalComponent) {
    this.cachedResourcesService.remove(this.selectedItems).subscribe(
      () => {
        itemModal.modal.hide();
      },
      (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              this.focus();
            });
        } else {
          itemModal.errors.emit(errors);
        }
      });
  }
}
