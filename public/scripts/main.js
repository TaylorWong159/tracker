$(document).ready(() => {
  $('#login').on('click', () => {
    const name = $('#username').val();
    const password = $('#password').val();

    $.ajax({
      method: 'post',
      url: 'login',
      data: JSON.stringify({
        name: name,
        password: password
      }),
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
        if (data.userFound) {
          document.cookie = `user=${data.user}`;
          window.location.reload();
        }
      }
    });
  });
});
