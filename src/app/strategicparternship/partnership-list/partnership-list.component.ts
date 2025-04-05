import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {StrategicPartnership, StrategicPartnershipService} from '../strategicparternship.service';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-partnership-list',
  templateUrl: './partnership-list.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  standalone: true,
  styleUrls: ['./partnership-list.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PartnershipListComponent implements OnInit {

  partnerships: StrategicPartnership[] = [];

  constructor(private partnershipService: StrategicPartnershipService) { }

  showAnimation = true;  // To control if the animation is visible

  ngOnInit(): void {
    this.loadPartnerships();
    // Hide the animation after 5 seconds and show the workflow content
    setTimeout(() => {
      this.showAnimation = false;
    }, 6000);
  }

  loadPartnerships(): void {
    this.partnershipService.getAllPartnerships().subscribe(data => {
      this.partnerships = data;
    });
  }

  deletePartnership(id: string): void {
    this.partnershipService.deletePartnership(id).subscribe(() => {
      this.loadPartnerships();
    });
  }
}
