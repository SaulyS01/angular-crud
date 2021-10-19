import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Tutorial from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    title: '',
    description: '',
  };
  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updateState(status: boolean): void {
    if (this.currentTutorial.key) {
      this.tutorialService.update(this.currentTutorial.key, { state: status })
      .then(() => {
        this.currentTutorial.state = status;
        this.message = 'El estado se actualizó correctamente!';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };

    if (this.currentTutorial.key) {
      this.tutorialService.update(this.currentTutorial.key, data)
        .then(() => this.message = 'Se ha actualizado correctamente!')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTutorial.key) {
      this.tutorialService.delete(this.currentTutorial.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Se ha eliminado correctamente!';
        })
        .catch(err => console.log(err));
    }
  }
}
