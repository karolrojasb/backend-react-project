const user_model = require('../models/user.model')

class UserService {

  createUser(new_user){
    return new_user.save()
  }

  updateUser(user_id, new_user){
    return user_model.findByIdAndUpdate(user_id, new_user, {new: true})
  }

  listUsers(){
    return user_model.find()
  }

  showUser(user_id){
    return user_model.findById(user_id)
  }

  deleteUser(user_id){
    return user_model.findByIdAndDelete(user_id)
  }
}

module.exports = UserService
