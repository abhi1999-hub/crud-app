$("#add_user").submit((e)=>alert("Data Inserted successfully!!."));


$("#update_user").submit(function(e){
    e.preventDefault();
    var unindex_array = $(this).serializeArray();
    console.log(unindex_array)
    let data={};
    $.map(unindex_array, (item)=>{
        data[item.name]=item.value
    })
    
    var request ={
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(()=>alert("data updated successfully!!."))
})

if(window.location.pathname=="/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id= $(this).attr("data-id");
    
    var request ={
        "url":`http://localhost:3000/api/users/${id}`,
        "method":"DELETE"
    }
    if(confirm("DO you really want to delete this record?")){
        $.ajax(request).done(()=>{
            alert("data deleted successfully!!.")
            location.reload();
        })
    }
})
}