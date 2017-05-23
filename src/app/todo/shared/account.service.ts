import { HttpHelper } from 'rucken';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper, AccountService } from 'rucken';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { User } from 'rucken/shared/models/user.model';
@Injectable()
export class TodoAccountService extends AccountService {
  account$: Subject<User>;
  _account: User;
  constructor(public endpointHelper: EndpointHelper) {
    super(endpointHelper);
    this.apiUrl = `${endpointHelper.apiUrl}/${this.name}`;
    this.account$ = <Subject<User>>new Subject();
  }
  info() {
    if (localStorage.getItem('token') === null) {
      return super.logout();
    }
    return super.info();
  }
  logout() {
    localStorage.removeItem('token');
    return super.logout();
  }
}
