$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize(), 
            dataType: 'json',
            success: function(data) {
                if(data.success) {
                    alert('It\'s a succes');
                } else {
                    alert('Error, try again please');
                }
            },
            error: function(data) {
                alert('Error, try again please');
            } 
        });
        return false;
    });
});