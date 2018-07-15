const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: { type: String, required: 'this field is required', unique: true },
  email: { type: String, required: 'this field is required', unique: true },
  password: { type: String, required: 'this field is required'},
  admin: {type: Boolean},
  image: { type: String, default: 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'},
  bio: { type: String, default: 'Update your bio!' }
});

userSchema.virtual('groups', {
  localField: '_id',
  foreignField: 'members',
  ref: 'Group'
});

userSchema.virtual('groups', {
  localField: '_id',
  foreignField: 'creator',
  ref: 'Group'
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json){
    delete json.password;
    return json;
  }
});

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('password');
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
