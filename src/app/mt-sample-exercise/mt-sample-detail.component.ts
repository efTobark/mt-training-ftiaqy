import { Component, OnInit } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { SelectedFarmService } from "./selected-farm.service";
import { takeUntil } from "rxjs/operators";
import { Farm } from "./farm";
import {
  EditService,
  ToolbarService,
  SortService
} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "mt-sample-detail",
  templateUrl: "./mt-sample-detail.component.html"
})
export class MtSampleDetailComponent implements OnInit {
  /** Granja seleccionada */
  selectedFarm: Farm;
  /** Subscripción a servicio */
  selectedSubs: Subscription;

  constructor(private selectedService: SelectedFarmService) {}

  ngOnInit() {
    this.selectedSubs = this.selectedService.selectedFarm.subscribe(
      (farm: Farm) => {
        this.selectedFarm = farm;
      }
    );
  }
  ngOnDestroy() {
    this.selectedSubs.unsubscribe();
  }
}
