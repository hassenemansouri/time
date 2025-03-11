import { Component, OnInit } from '@angular/core';
import {StrategicPartnership, StrategicPartnershipService} from '../strategicparternship.service';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-partnership-list',
  templateUrl: './partnership-list.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./partnership-list.component.css']
})
export class PartnershipListComponent implements OnInit {

  partnerships: StrategicPartnership[] = [];

  constructor(private partnershipService: StrategicPartnershipService) { }

  ngOnInit(): void {
    this.loadPartnerships();
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
