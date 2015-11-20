import Ember from 'ember';

export default Ember.Object.extend({
  firstName: null,
  lastName: null,
  nickName: null,
  email: null,
  age: null,
  authorOf: null,
  conferences: [],
  greet: function (){
    return "Hi, My name is " + this.firstName + " " + this.lastName + ". You can call me " + this.nickName;
  },
  
  isOld: Ember.computed("age", function() {
    if (this.get("age") > 30){
      return true;
    }
    else {
      return false;
    }
  }),
  
  wroteRuby: Ember.computed("nickname", function(){
    if (this.get("nickName") === "Matz") {
      return true;
    }
    else {
      return false;
    }
  }),

  addConference(conference){
    // return this.get("conferences").pushObject(conf);
    this.conferences.push(conference);
  },

  keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
    var conferences = this.get("conferences");
    var fullName = `${this.get("firstName")} ${this.get("lastName")}`;
    return conferences.filterBy("keyNote", fullName);
  }),

  conferenceNames: Ember.computed("conferences.@each.name", function(){
    var conferences = this.get("conferences");
    var names = [];
    conferences.forEach((conference) => {
      names.push(conference.name);
    });
    return names;
  }),

  conferenceTotal: Ember.computed("keyNoteConferences", function(){
    var conferences = this.get("conferences");
    return conferences.length;
  }),

  itinerary: Ember.computed("nickName", "conferenceTotal", function(){
    return `${this.get("nickName")} is speaking at ${this.get("conferenceTotal")} conferences`;
  }),

  hasValidEmail: Ember.computed("email", function() {
    var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return emailRegex.test(this.email);
  }),

  isInvalid: Ember.computed("firstName", "lastName", "age", "email", function(){
    if(this.get("firstName") === null || this.get("lastName") === null || this.get("age") === null || this.get("email") === undefined){
      return true;
    }
  }),

  errors: Ember.computed("firstName", "lastName", "age", "hasValidEmail", function(){
    var errors = [];
    if (!this.get("firstName")) {
      errors.push("firstName cannot be blank");
    } 
    if (!this.get("lastName")) {
      errors.push("lastName cannot be blank");
    }
    if (!this.get("age")) {
      errors.push("age cannot be blank");
    } 
    if (!this.get("hasValidEmail")) {
      errors.push("email must be valid");
    } 
    return errors;
  }),

  hasErrors: Ember.computed("errors", function(){
    return (this.get("errors.length") > 0);
  }),

  isInvalid: Ember.computed("errors", function(){    
    return (this.get("hasErrors"));
  }),

  isValid: Ember.computed("errors", function(){
    return (!this.get("hasErrors"));
  })
});

export var Programmer = Ember.Object.create();
