import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {// created using chatgpt searched fill in the iEvent interface based of the event schema copy the EventSchema & paste it
    _id: string;
    title: string;
    description?: string;
    location: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    categoryId: {_id: string, name: string};
    organizer: {_id: string, firstName: string, lastName: string}; 
}

const EventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    location: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    startDateTime: {type: Date, default: Date.now},
    endDateTime: {type: Date, default: Date.now},
    price: {type: String},
    isFree: {type: Boolean, default: false},
    url: {type: String},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},//refrencing the Category model
    organizer: [{type: Schema.Types.ObjectId, ref: 'User'}]//refrencing the User model
})

const Event = models.Event || model('Event', EventSchema);

export default Event;