import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Firebase app works!';
  cuisines: FirebaseListObservable<any[]>;
  restaurant;


  constructor(private af: AngularFire){
    
  }


  ngOnInit(){
    this.cuisines = this.af.database.list('/cuisines');
    this.restaurant = this.af.database.object('/restaurant')

    console.log('this.restaurant', this.restaurant)
   }

   remove(){
     this.af.database.object('/restaurant').remove()
     .then(x => console.log("SUCESS"))
     .catch(error => console.log("ERROR", error))
   }

   update(){

    this.af.database.object('/favorites/1/10').set(null)
    //  this.af.database.object('/favorites/1/10').set(true)
      
      // this.af.database.object('/restaurant').set({
      //   name: "New Name",
      //   rating: 5
      // })

    //  this.af.database.object('/restaurant').update({
    //    name: "New Name",
    //    rating: 5
    //  })

   }

  add(){
    this.cuisines.push({
      name:"Bread Keys",
      details: {
        description: "May the force be with you."
      }
       
    })
  }
 

}
