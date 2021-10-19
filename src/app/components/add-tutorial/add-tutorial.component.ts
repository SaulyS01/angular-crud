import { Component, OnInit } from '@angular/core';
import Tutorial from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = new Tutorial();
  state = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    this.tutorialService.create(this.tutorial).then(() => {
      console.log('Created new item successfully!');
      this.state = true;
    });
  }

  newTutorial(): void {
    this.state = false;
    this.tutorial = new Tutorial();
  }
}
