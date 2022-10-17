import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  Ref,
  prop
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { User } from './user';
import { Types } from 'mongoose';

enum Status {
  public = 'public',
  private = 'private'
}

// @modelOptions(({
//   schemaOptions: { collection: "story", timestamps: true }
//  })

@modelOptions({
  schemaOptions: {
    collection: 'stories',
    // Add createdAt and updatedAt fields
    timestamps: true
  }
})
@index({ title: 1 })

// enum Status {
//     PUBLIC = "public",
//     PRIVATE = "private"
// }
export class Story {
  @prop({ required: true, trim: true })
  title: string;

  @prop({ required: true })
  story: string;

  // @prop({ enum: Status, default: 'public' })
  // status: Status;

  @prop({ type: () => String, default: 'public', enum: Object.values(Status) })
  status: string;

  // @prop({ type: () => Types.ObjectId })
  // @prop({ type: () => User })
  @prop({ ref: () => User })
  user: Ref<User>;
}

// create the story model from the Story class
const storyModel = getModelForClass(Story);
export default storyModel;
