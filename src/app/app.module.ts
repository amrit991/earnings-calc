import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import {ThemePalette} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClientModule } from "@angular/common/http";
import { AutofocusDirective } from './autofocus.directive';
import { OnlyNumberDirective } from './only-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    OnlyNumberDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      "radius": 115,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy":true,
      "unitsColor": "#4778EF",
      "animateSubtitle":true,
      "subtitleColor": "#6d7783",
      "titleFontSize": "26",
      "unitsFontSize": "14",
      "titleFontWeight": "900",
      "unitsFontWeight": "700",
      "subtitleFontSize": "12",
      "subtitleFontWeight": "700",
      "titleColor": "#4678df"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
