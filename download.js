if(!(window.jQuery && window.jQuery.fn.jquery == '1.3.2')) {var s = document.createElement('script');s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');s.setAttribute('type', 'text/javascript');document.getElementsByTagName('head')[0].appendChild(s);}

function add_download_links(video_id) {
    var url = 'http://api.justin.tv/broadcast/by_archive/' + video_id + '.json';
    var video = $('#' + video_id);
    var video_meta = $('.video_meta', video);
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            var video_file_urls = [];
            for (var i = 0; i < data.length; ++i) {
                video_file_urls.push(data[i]['video_file_url']);
            }

            var columns = 4;
            var rows = video_file_urls.length / columns;
            var table = '<table class="download_table">';
            for (var i = 0; i < rows; ++i) {
                table += '<tr>';
                for (var j = 0; j < columns; ++j) {
                    var index = i * columns + j;
                    if (index < video_file_urls.length) {
                        var link = '<a href="' + video_file_urls[index] + '">Part ' + (index + 1) + '</a>';
                    }
                    else {
                        var link = "";
                    }
                    table += '<td>' + link + '</td>';
                }
                table += '</tr>';
            }
            table += '</table>';

            video_meta.append(table);
        },
        error: function(data) {
            response = JSON.parse(data.response);
            console.log(response['error']);
            var download_button = $('.download_button', video_meta);
            download_button.html(response['error']);
        }
    });
}

function add_download_button(index, video, array) { 
    var video_meta = $('.video_meta', video);
    var download_button = '<a class="download_button">Get download links!</a>';
    download_button = $(download_button);
    download_button.click(function() {
        add_download_links(video.id);
    });
    video_meta.append(download_button);
}

videos = $('.video');
videos.map(add_download_button);