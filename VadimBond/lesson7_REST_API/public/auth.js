// Вход на страницу
function auth(userName, userPassword) {
	$.ajax({
		url: "/auth",
		contentType: "application/json",
		method: "POST",
		data: JSON.stringify({
			username: userName,
			password: userPassword,
		}),
		success: function(res) {
			document.cookie = "token=" + res.token;  // создаем cookie для использования в front.js
			reset();
			setTimeout(function() {
				window.location.href = "//localhost:3000";
			}, 2000);
		},
	})
}

// сброс формы
function reset() {
	const form = document.forms["authForm"];
	form.reset();
}

// отправка формы
$("form").submit(function(e) {
	e.preventDefault();
	const username = this.elements["username"].value;
	const password = this.elements["password"].value;

	auth(username, password);
});
