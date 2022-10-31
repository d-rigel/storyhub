import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  setGlobalOptions,
  Severity
} from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

// setLogLevel(LogLevels.INFO),
setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });
@index({ email: 1 })
@pre<User>('save', async function () {
  // Hash password if the password is new or was updated
  if (!this.isModified('password')) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true
  }
})

// Export the User class to be used as TypeScript type
export class User {
  @prop()
  name: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 8, maxlength: 100, select: false })
  password: string;

  @prop({ default: 'user' })
  role: string;

  @prop({ default: 'default.png' })
  photo: string;

  @prop({ default: false })
  verified: boolean;

  @prop({ default: 'local' })
  provider: string;

  // ....................
  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;
