import { BaseResourceModel, translate } from 'rucken';
import { TodoProject } from './todo-project.model';

export class TodoStatus extends BaseResourceModel {
  static titles: any = {
    id: translate('Id'),
    project: translate('Project'),
    name: translate('Name'),
    title: translate('Title'),
    createdAt: translate('Created at'),
    updatedAt: translate('Updated at'),
    statuses: translate('Statuses'),

  };
  static dateFields: any = ['createdAt', 'updatedAt'];
  static fields: any = [
    'id',
    'project',
    'name',
    'title',
    'createdAt',
    'updatedAt',
  ];

  className = 'TodoStatus';

  id: number;
  project: TodoProject;
  name: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  static meta() {
    const meta: any = TodoStatus;
    return meta;
  }
  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, TodoStatus.meta());
    this.project = obj.project ? new TodoProject(obj.project) : null;
  }
  format() {
    const result = this.formatByFields(TodoStatus.meta());
    result.project = result.project ? result.project.format() : null;
    return result;
  }
  get asString() {
    return this.title;
  }
}
