$(document).ready(function() {

    // $('#tabelaVendedor tfoot th').each( function () {
    //     var title = $(this).text();
    //     $(this).html( '<input type="text" size="10" placeholder="'+title+'" /input>' );
    // } );

    window.table = $("#tabelaVendedor").DataTable({
        paging: true,
        dom: 'Bfrtip',
        colReorder: true,
            buttons: [
                {
                    extend: 'colvis',
                    text: 'Colunas Visíveis'
                },
                'copy', 'excel', 'print',
                {
                    text: 'Atualiza',
                    action: function () {
                         window.location.reload();
                    }
                }
                ],
        order: [[0, "asc"]],
        stateSave: false,
        responsive: false,
        scrollY: "400px",
        scrollX: "0px",
        scrollCollapse: true,
        language: {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
                    },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
                    },
            "select": {
                "rows": {
                    "_": "Selecionado %d linhas",
                    "0": "Nenhuma linha selecionada",
                    "1": "Selecionado 1 linha"
                        }
                    },
            "buttons": {
                "print": "Imprimir",
                "copy": "Copiar",
                "copyTitle": "Cópia bem sucedida",
                "copySuccess": {
                    "1": "Uma linha copiada com sucesso",
                    "_": "%d linhas copiadas com sucesso"
                    }
                }
             },
    });
                
    // Apply the search
    table.columns().every( function () {
        var that = this;
    
        $( 'input', this.footer() ).on( 'keyup change clear', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
});

function novoProduto(){
    var vendedor = '1&'
    var form = vendedor + $('form').serialize();
    alert(form);
    $.ajax({
        method: "POST",
        crossDomain: true,
        url : 'http://localhost:8080/produto/vendedor/' + form,
        contentType: false,
        processData : false,
        dataType: 'string',
        data  :  form,
        success : function (res, data){
            console.log(res);
            console.log(data);
            flash('Novo produto criado com sucesso.', 'info');
            $('#modalNovoProduto').modal('hide');
        },
        error : function(res, data){
            console.log(res);
            console.log(data);
            alert('Algo de errado aconteceu, tente novamente mais tarde.');
        }
    })
}