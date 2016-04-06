export module PlanModels {
    
    export enum EventType{
        date = <any>'date', 
        catchup = <any>'catchup', 
        meeting = <any>'meeting'
    }
    
     export class Event {
        public date: Date;
        public memo: string;
        public type:EventType;
        
        constructor(data:any){
            this.date = new Date(Date.parse(data.date)); 
            this.memo = data.memo;
            this.type = EventType[<string>data.type];
        }

    }
    
    export class Day {
        public date: Date;
        public events: Event[];
        
        constructor(data:any){
            this.date = new Date(Date.parse(data.date)); 
            this.events = new Array<Event>();
            if (data.events){
                for (var i = 0; i < data.events.length; i++) {
                    var dataEvent = data.events[i];
                    var event = new Event(dataEvent);
                    this.events.push(event);
                }
            }
        }

    }
    
    export class Plan {
        public id: string;
        public name: string;
        public days: Day[];
        
        constructor(){
            this.days = new Array<Day>();
        }
        
        public mapFromAny(data:any){
           this.id = data._id;
           this.name = data.name;
           if (data.days){
               for (var i = 0; i < data.days.length; i++) {
                   var dataDay = data.days[i];
                   var day = new Day(dataDay);
                   this.days.push(day);
               }
           }
        }

    }

}

