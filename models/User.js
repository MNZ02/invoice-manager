<<<<<<< HEAD
const mongoose = require('mongoose');
=======
const mongoose = require('mongoose')
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263

const userSchema = new mongoose.Schema({
  businessLogo: String,
  businessName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
<<<<<<< HEAD
=======
  password: {
    type: String,
    required: true
  },
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263
  contact: String,
  bankName: String,
  bankAccountNumber: String,
  ifscCode: String,
  GST: String,
  address: String,
  bankAccountHolderName: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
<<<<<<< HEAD
});

const User = mongoose.model('User', userSchema);

module.exports = User;
=======
})

const User = mongoose.model('User', userSchema)

module.exports = User
>>>>>>> f9f7814df16a70c8194c53a1480417fe17d2a263
