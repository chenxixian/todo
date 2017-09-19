import { SelectInputModule, FooterButtonsModule, TextInputModule, SharedModule } from 'rucken';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { <%=grid.name.camel%>SelectInputComponent } from './<%=grid.name.kebab%>-select-input.component';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { <%=grid.list.name.camel%>ListModalModule } from '../<%=grid.list.name.kebab%>-list-modal/<%=grid.list.name.kebab%>-list-modal.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    <%=grid.list.name.camel%>ListModalModule.forRoot(),
    FooterButtonsModule.forRoot(),
    TextInputModule.forRoot(),
    TooltipModule.forRoot(),
    SelectInputModule.forRoot()
  ],
  declarations: [
    <%=grid.name.camel%>SelectInputComponent
  ],
  exports: [<%=grid.name.camel%>SelectInputComponent],
  entryComponents: [<%=grid.name.camel%>SelectInputComponent]
})
export class <%=grid.name.camel%>SelectInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: <%=grid.name.camel%>SelectInputModule,
      providers: []
    };
  }
}
