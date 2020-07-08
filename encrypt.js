const chars = '\'AariYjZks890!@#KeWfNgJ3BC4nwOopqX()`>-_=EP+[DMUL~\\/|I?H2FyVzT5$Q%}^G&*bcRdhlSm1,.<];:{"'.split('');

function shuffle(str, shift) {
  let data = str.split('');
  let res = ''
  for (char of data) {
    let index = chars.indexOf(char);
    if (index + shift >= chars.length) {
      res += chars[(index + shift) - chars.length];
    } else if (index + shift < 0) {
      res += chars[(chars.length + (index + shift))];
    } else {
      res += chars[index + shift];
    }
  }
  return res;
}

function encrypt(str) {
  return shuffle(str, 3);
}

function decrypt(str) {
  return shuffle(str, -3);
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
