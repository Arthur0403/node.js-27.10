
const socket = io.connect('http://localhost:3000');

// Получение всех задач
function getAll() {
	$.ajax({
		url: "/tasks",
		type: "GET",
		contentType: "application/json",
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

	setTimeout(function() {
		socket.emit('add_change_delete', {});
	}, 400)
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

	setTimeout(function() {
		socket.emit('add_change_delete', {});
	}, 400)
});

// первоначальная загрузка всех задач
getAll();

// блок socket.io
socket.on('add_change_delete', () => {
	setTimeout(function() {
		$("table tbody").empty();
		getAll();
	}, 500)
});
