import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { CharacterService } from '../services/character.service';
import {take} from 'rxjs/operators';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

type RequestInfo = {
  next: string
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  displayedColumns: string[] = ['id', 'name', 'type','image', 'created'];
  dataSource: any = [];
  

  info: RequestInfo = {
    next: '',
  }
  
  constructor(private characterService: CharacterService, 
    private _liveAnnouncer: LiveAnnouncer) { }
    
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.getCharacters()
  }
  
  getCharacters(query = '', paginate = 1) {
    this.characterService.getCharacters(query, paginate)
    .pipe(take(1))
    .subscribe((res: any) => {
        if (res?.results?.length) {
          const { info, results } = res;
          this.characters = results;
          this.dataSource = new MatTableDataSource(this.characters);
          console.log(this.characters)
          this.info = info;
        }
        else{ 
          this.characters = []
        }
    });
  }

  searchByName(value: string) {
    console.log(value)
    if(value && value.length > 3) {
      this.getCharacters(value)
    }
  }

}
