function add_download(index, video, array) { 
    var url = 'http://api.justin.tv/broadcast/by_archive/' + video.id + '.json';
    console.log(url);
    var video_meta = $('.video_meta', video);
    
    
    $.getJSON(url, function(data) {
        var video_file_urls = [];
        for (var i = 0; i < data.length; ++i) {
            video_file_urls.push(data[i]['video_file_url']);
        }

        var columns = 4;
        var rows = video_file_urls.length / columns;
        var table = '<table class="download_table">';
        table += '<th>Download:</th>';
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
    });
    
}

videos = $('.video');
videos.map(add_download);