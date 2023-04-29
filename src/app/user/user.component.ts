
import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userform:FormGroup|any;
  data:any;
  isedit:boolean=false;
  username:any;
  usernameShow:any;
  

  constructor(private _dataservice:DataserviceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userform=new FormGroup({
      'name':new FormControl(),
      'email':new FormControl(),
      'phone': new FormControl(),
      'website':new FormControl(),
    })
    this.getdata();
  }

  getdata(){
    this._dataservice.getdata().subscribe(res=>{
      this.data=res;
      console.log(res);
    })
  }

  update(user:any){
    this.userform.id=user.id;
    this.usernameShow=this.userform.value.name;
    this._dataservice.update(this.userform.id, this.userform.value).subscribe(res=>{
      this.getdata();
    })
  }

  sendata(user: any){
    this._dataservice.postdata(user.value).subscribe(res=>{
      this.getdata();
    })
  }

  addmodel(){
    this.isedit=false;
    this.userform.res;
  }

  edit(i:any, user:any){
    this.isedit=true;
    this.userform.id=user.id;
    this.userform.patchValue(user);
  }

  delete(index:number, user:any){
    this.userform.id=user.id;
    this._dataservice.delete(this.userform.id, user).subscribe(res=>{
      this.data.splice(index,1);
    })
  }


}
