import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LinkComponent } from './link/link.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectItemComponent } from './projects/project-list/project-item/project-item.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LinkComponent,
    SkillsetComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectItemComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
