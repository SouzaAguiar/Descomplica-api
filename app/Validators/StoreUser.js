"use strict";
const Antl = use("Antl");

class StoreUser {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      email: "required|email|unique:users",
      password: "required|confirmed|min:4",
      name: "required",
      gender: "required",
      state: "required",
      city: "required"
    };
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = StoreUser;
