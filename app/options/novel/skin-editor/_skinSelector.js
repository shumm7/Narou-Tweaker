
export function skinSelector(){
    setSortable()

    $("#skin-selector .skin-selector--draggable-item").on("click", function(e){
        $("#skin-selector .skin-selector--draggable-item.selected").removeClass("selected")
        $(this).addClass("selected")
    })
}

function setSortable(){
    if($("#skin-selector--current .skin-selector--draggable").length){
        Sortable.create($("#skin-selector--current .skin-selector--draggable")[0], {
            handle: '.skin-selector--draggable-item',
            sort: 1,
            group: {
                name: 'skin-selector--draggable-item',
                pull: true,
                put: true
            },
            filter: ".active",
            animation: 150,
            onAdd: function (e) {
                console.log(e)
            },
            onChange: function (e) {
                console.log(e)
            },
        });
    }
    if($("#skin-selector--available .skin-selector--draggable").length){
        Sortable.create($("#skin-selector--available .skin-selector--draggable")[0], {
            handle: '.skin-selector--draggable-item',
            sort: 1,
            group: {
                name: 'skin-selector--draggable-item',
                pull: true,
                put: true
            },
            animation: 150,
            onAdd: function (e) {
                console.log(e)
            },
            onChange: function (e) {
                console.log(e)
            },
        });
    }
}