import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reward } from './reward.model';
import { RewardService } from './reward.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reward-form',
  templateUrl: './reward-form.component.html',
  styleUrls: ['./reward-form.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class RewardFormComponent implements OnInit {
  reward: Reward = { type: '', description: '' };
  isEdit: boolean = false;

  constructor(
    private rewardService: RewardService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.rewardService.getRewardById(id).subscribe(data => {
        this.reward = data;
      });
    }
  }

  saveReward(): void {
    if (this.isEdit) {
      if (!this.reward.id) {
        console.error('ID invalide');
        return;
      }
      this.rewardService.updateReward(this.reward.id, this.reward).subscribe({
        next: () => {
          console.log('Reward modifiée avec succès');
          this.router.navigate(['/rewards']);
        },
        error: (err) => console.error('Erreur lors de la modification de la reward:', err)
      });
    } else {
      this.rewardService.createReward(this.reward).subscribe({
        next: () => {
          console.log('Reward créée avec succès');
          this.router.navigate(['/rewards']);
        },
        error: (err) => console.error('Erreur lors de la création de la reward:', err)
      });
    }
  }
}
