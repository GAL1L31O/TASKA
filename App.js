$(document).ready(function() {

    let edit = false;

    $('#task-result').hide();
    fetchTasks();

    $('#search').keyup(function(e) {
        if($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function(res) {
                    let tasks = JSON.parse(res);
                    let template = '';
    
                    tasks.forEach(task => {
                        template += '<li>'+ task.name +'</li>';
                    });
    
                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });

    $('#task-form').submit(e => {
        const postData = {
            name: $('#name').val(),
            descripcion: $('#descripcion').val(),
            id: $('#taskId').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-edit.php';

        $.post(url, postData, (res) => {
            console.log(res);
            fetchTasks();
            $('#task-form').trigger('reset');
        });
        e.preventDefault();
    });

    function fetchTasks() {
        edit = false;
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: (res) => {
                let tasks = JSON.parse(res);
                let template = '';
                tasks.forEach(task => {
                    template += 
                        '<tr taskId="' + task.id + '">' + 
                            '<td>' + task.id + '</td>' +
                            '<td>' + 
                                '<a href="#" class="task-item">' + 
                                    task.name + 
                                '</a>' +
                            '</td>' + 
                            '<td>' + task.descripcion + '</td>' + 
                            '<td>' +
                                '<button class="task-delete btn btn-danger"> Delete </button>'
                            '</td>' +
                        '</tr>';
                })
                $('#tasks').html(template);
            }
        })
    }

    $(document).on('click', '.task-delete', function () {
        if (confirm('Are you sure you want to delete it?')) {
            let e = $(this)[0].parentElement.parentElement;
            let id = $(e).attr('taskId');
            $.post('task-delete.php', { id }, function (res) {
                fetchTasks();
            })
        }
    })

    $(document).on('click', '.task-item', function () {
        let e = $(this)[0].parentElement.parentElement;
        let id = $(e).attr('taskId');
        $.post('task-single.php', { id }, function(res) {
            const task = JSON.parse(res);
            $('#name').val(task.name);
            $('#descripcion').val(task.descripcion);
            $('#taskId').val(task.id);
            edit = true;
        })
    })

});