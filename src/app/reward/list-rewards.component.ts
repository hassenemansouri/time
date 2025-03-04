import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RewardService } from './reward.service';
import { Reward } from './reward.model';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-list-rewards',
  templateUrl: './list-rewards.component.html',
  styleUrls: ['./list-rewards.component.css'],
  standalone: true,
  imports: [NgForOf, RouterLink, DatePipe]
})
export class ListRewardsComponent implements OnInit {
  rewards: Reward[] = [];

  constructor(private rewardService: RewardService, private router: Router) {}

  ngOnInit(): void {
    this.loadRewards();
  }

  loadRewards(): void {
    this.rewardService.getAllRewards().subscribe(data => {
      this.rewards = data;
    });
  }

  deleteReward(id: string | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cette reward ?')) {
      this.rewardService.deleteReward(id).subscribe(() => {
        this.rewards = this.rewards.filter(r => r.id !== id);
      });
    }
  }
}
