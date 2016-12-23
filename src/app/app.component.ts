import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Firebase app works!';
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire){
    
  }


  ngOnInit(){

    this.af.database.list('/restaurants').push({name: ''})
      .then(x => {
        let restaurant = { name: 'My New Restaurant'};
        console.log(restaurant)
        let update = {};
        
        // update['restaurants/' + x.key] = restaurant;
        // update['restaurants-by-city/camberwell/' + x.key] =  restaurant;

        update['restaurants/' + x.key] = null;
        update['restaurants-by-city/camberwell/' + x.key] =  null;

        this.af.database.object('/').update(update);
      });


    // this.cuisines = this.af.database.list('/cuisines');
    this.cuisines = this.af.database.list('/cuisines', {
      query: {
        orderByValue: true
        // orderByKey: true
      }
    });


    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'rating',
        equalTo: 5,
        limitToFirst: 20

        // equalTo: 'Italian'        
        // startAt: 3,endAt: 4
        
        // orderByChild: '/address/city'
        // orderByChild: 'name'
      }
    });

    // this.restaurants = this.af.database.list('/restaurants')
    //   .map(restaurants => {
    //     restaurants.map(restaurant => {
    //       restaurant.featureTypes =[];
    //       for(var f in restaurant.features){
    //           restaurant.featureTypes.push(this.af.database.object(/features/ + f))
    //       }
    //       // restaurant.cuisinesType = this.af.database.object('/cuisines/' + restaurant.cuisine);  
    //     })
    //     return restaurants;
    //   });

    // restaurants/1/features/1
    this.exists = this.af.database.object('/restaurants/1/features/1');
    this.exists.take(1).subscribe(x => {
      console.log(x)

      if(x && x.$value){
        console.log("EXISTS");
      } else {
        console.log("NOT EXISTS");
      }


    });


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
