import { Injectable } from '@angular/core';
import { PiratesService } from './pirates.service';

@Injectable()
export class PiratesRecieveService {

  public list: any[] = [];

  constructor(private piratesService: PiratesService) { }

  initializeData() {
    this.piratesService.getPirates_v1().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },1250); })
    this.piratesService.getPirates_v2().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },1200); })
    this.piratesService.getPirates_v3().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },1150); })
    this.piratesService.getPirates_v4().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },1100); })
    this.piratesService.getPirates_v5().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },1050); })
    this.piratesService.getPirates_v6().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },1000); })
    this.piratesService.getPirates_v7().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },950); })
    this.piratesService.getPirates_v8().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },900); })
    this.piratesService.getPirates_v9().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },850); })
    this.piratesService.getPirates_v10().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },800); })
    this.piratesService.getPirates_v11().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },750); })
    this.piratesService.getPirates_v12().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },700); })
    this.piratesService.getPirates_v13().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },650); })
    this.piratesService.getPirates_v14().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },600); })
    this.piratesService.getPirates_v15().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },550); })
    this.piratesService.getPirates_v16().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },500); })
    this.piratesService.getPirates_v17().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },450); })
    this.piratesService.getPirates_v18().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },400); })
    this.piratesService.getPirates_v19().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },350); })
    this.piratesService.getPirates_v20().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },300); })
    this.piratesService.getPirates_v21().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },250); })
    this.piratesService.getPirates_v22().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },200); })
    this.piratesService.getPirates_v23().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },150); })
    this.piratesService.getPirates_v24().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },100); })
    this.piratesService.getPirates_v25().subscribe( (response: any[]) => { setTimeout(() => { this.list ? this.list = this.list.concat(response['data']) : this.list; },50); })
  }

}
