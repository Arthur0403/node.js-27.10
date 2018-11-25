
function getCookie(cookieName) {
	let results = document.cookie.match( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );
	if (results) {
		return unescape(results[2]);
	} else {
			return null;
	}
}

const cookie = getCookie("token");  // берем токен из cookie (туда положили в auth.js)

// Получение всех задач
function getAll() {
	$.ajax({
		url: "/tasks",
		type: "GET",
		contentType: "application/json",
		beforeSend: function (xhr) {   //Include the bearer token in header
			xhr.setRequestHeader("Authorization", 'Bearer '+ cookie);
		},
		success: (docs) => {
			let rows = "";
			$.each(docs, (index, doc) => {
				// добавляем полученные задачи в таблицу
				rows += row(doc);
			});
			$("table tbody").append(rows);
		},
	});
}

// Добавление задачи
function add(taskName) {
	$.ajax({
		url: "/tasks",
		contentType: "application/json",
		method: "POST",
		data: JSON.stringify({
			name: taskName,
		}),
		beforeSend: function (xhr) {   //Include the bearer token in header
			xhr.setRequestHeader("Authorization", 'Bearer '+ cookie);
		},
		success: function(task) {
			reset();
			$("table tbody").append(row(task));
		},
	})
}
// Изменение задачи
function change(taskId, taskName) {
	$.ajax({
		url: "/tasks/"+taskId,
		contentType: "application/json",
		method: "PUT",
		data: JSON.stringify({
			name: taskName,
		}),
		beforeSend: function (xhr) {   //Include the bearer token in header
			xhr.setRequestHeader("Authorization", 'Bearer '+ cookie);
		},
		success: function(task) {
			reset();
			$("tr[data-rowid='" + task._id + "']").replaceWith(row(task));
		},
	})
}
// Пометить, как исполненную
function complete(taskId) {
	$.ajax({
		url: "/tasks/"+taskId,
		contentType: "application/json",
		method: "PATCH",
		data: JSON.stringify({
			completed: true,
		}),
		beforeSend: function (xhr) {   //Include the bearer token in header
			xhr.setRequestHeader("Authorization", 'Bearer '+ cookie);
		},
		success: function(task) {
			reset();
			$("tr[data-rowid='" + task._id + "']").replaceWith(row(task));
		},
	})
}

// Удаление задачи
function deleteTask(taskId) {
	$.ajax({
		url: "/tasks/"+taskId,
		contentType: "application/json",
		method: "DELETE",
		beforeSend: function (xhr) {   //Include the bearer token in header
			xhr.setRequestHeader("Authorization", 'Bearer '+ cookie);
		},
		success: function(task) {
			$("tr[data-rowid='" + task._id + "']").remove();
		},
	})
}

// Cброс формы
function reset() {
	const form = document.forms["taskForm"];
	form.reset();
	form.elements["id"].value = 0;
}

// создание строки для таблицы
let row = function(task) {
	return "<tr data-rowid='" + task._id + "'><td>" + task._id + "</td>" +
		"<td>" + task.name + "</td> <td>" + task.completed + "</td>" +
		"<td><a href='#' class='changeLink' data-id='" + task._id + "' data-name='" + task.name + "'>Change</a> | " +
		"<a href='#' class='completeLink' data-id='" + task._id + "' data-name='" + task.name + "'>Complete</a> | " +
		"<a href='#' class='deleteLink' data-id='" + task._id + "' data-name='" + task.name + "'>Delete</a></td></tr>";
};
// сброс значений формы
$("#reset").click(function(e) {
	e.preventDefault();
	reset();
});

// отправка формы
$("form").submit(function(e) {
	e.preventDefault();
	const id = this.elements["id"].value;
	const name = this.elements["name"].value;
	if (id === "0") {
		add(name);
	} else if (name === "") {
		complete(id);
	}	else {
		change(id, name);
	}
});

// нажимаем на ссылку Change
$("body").on("click", ".changeLink", function() {
	const id = $(this).attr("data-id");
	const name = $(this).attr("data-name");

	const form = document.forms["taskForm"];
	form.elements["id"].value = id;
	form.elements["name"].value = name;
});

// нажимаем на ссылку Complete
$("body").on("click", ".completeLink", function() {
	const id = $(this).attr("data-id");

	const form = document.forms["taskForm"];
	form.elements["id"].value = id;
});

// нажимаем на ссылку Delete
$("body").on("click", ".deleteLink", function() {
	const id = $(this).attr("data-id");

	deleteTask(id);
});

// первоначальная загрузка всех задач
getAll();
