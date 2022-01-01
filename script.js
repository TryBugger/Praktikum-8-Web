function allMenu(){
    $.getJSON('data.json', function(data) {
        let jajanan=data.jajanan;
        $.each(jajanan, function(i, data){
            deskripsi = textDescription(data.deskripsi);

            $('#daftar-menu').append(cardHTML(data));
        });
    });
}
allMenu();

$('.nav-link').on('click', function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let kategori = $(this).html();
    $('h4').html(`Daftar Jajanan Lawas ${kategori}`);
    if(kategori=='Semua'){
        $('#daftar-menu').empty();
        allMenu();
        return;
    }

    $.getJSON('data.json', function(data){
        let jajanan = data.jajanan;
        let content = '';
        $.each(jajanan, function(i,data){
            if(data.kategori.includes(kategori)){
                deskripsi = textDescription(data.deskripsi);

                content += cardHTML(data);
            }
        });
        $('#daftar-menu').html(content);
    });

});

function cardHTML(data) {
    return `
    <div class="col-md-2 d-flex">
        <div class="card mb-5 makananCard">
            <div class="card-header makananCardHeader"> 
                ${data.kategori} 
            </div>
            <img src="img/${data.gambar}" class="makananCardImg">
            <div class="card-body makananCardBody">
                <h5 class="card-title">${data.judul}</h5>
                <p class="card-text">${deskripsi}</p>
            </div>
            <div class="card-footer makananCardFooter">
                <a href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;
}

function textDescription(desc) {
    let max_char = 100;
    if(desc.length > max_char) {
        return desc.substring(0, max_char) + '...';
    } else  {
        return desc;
    }
}