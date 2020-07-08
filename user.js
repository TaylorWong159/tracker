class User {
  constructor(name, password, privid, pubid, friends) {
    this.name = name;
    this.password = password || '';
    this.friends = friends || [];
    this.pubid = pubid || 0;
    this.privid = privid || 0;
  }
}

class Friend {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

module.exports = {
  User: User,
  Friend: Friend
}
