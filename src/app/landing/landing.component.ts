import {Component, AfterViewInit, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, RippleModule, StyleClassModule, ButtonModule, DividerModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {
  }



}
