let name;
let password;

$(document).ready(() => {
  $('#login').on('click', () => {
    name = $('#username').val();
    password = $('#password').val();

    $.ajax({
      method: 'post',
      url: 'login',
      data: JSON.stringify({
        username: name,
        password: password
      }),
      contentType: 'application/json',
      success: (data) => {
        document.cookie = `user=${JSON.stringify({ username: name, password: password })}`;
        let formatedData = data.split('<body>')[1].split('</body>')[0];
        $('body').html(formatedData);
      }
    });
  });
});
