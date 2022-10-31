import {
  getModelForClass,
  index,
  modelOptions,
  Ref,
  prop
} from '@typegoose/typegoose';
import { User } from './user';
import mongoose from 'mongoose';

enum Status {
  public = 'public',
  private = 'private'
}

@modelOptions({
  schemaOptions: {
    collection: 'stories',
    // Add createdAt and updatedAt fields
    timestamps: true
  }
})
@index({ title: 1 })
export class Story {
  @prop({ required: true, trim: true })
  public title?: string;

  @prop({ required: true })
  public story?: string;

  @prop({ type: () => String, default: 'public', enum: Object.values(Status) })
  public status?: string;

  // @prop({ ref: () => User })
  // public user?: Ref<User>;
  @prop({ ref: 'User' })
  public user?: Ref<User>;
}

// create the story model from the Story class
const storyModel = getModelForClass(Story);
export default storyModel;
