import swal from 'sweetalert2';
import axios from "axios";

export function show_Alert(mensaje,icono,foco=''){
    if(foco != ''){
        document.getElementById(foco).focus();
    }
    swal.fire({
        title:mensaje,
        icon: icono,
        customClass: {confirmButton: 'btn btn-primary', popup:'animated zoomIn'},
        buttonsStyling: false
    });
}

export function confirmar(id,name){
 let url='http://laraproducts.test/api/products/'+id;
 const swalWithBootstrapButtons =  swal.mixin({
     customClass:{confirmButton: 'btn btn-success me-3' ,cancelButton:'btn btn-danger'},
     buttonsStyling: false
 });
 swalWithBootstrapButtons.fire({
     title: 'Seguro que desea eliminar el producto'+name,
     text: 'Se perderá la información del producto',
     icon: 'question',
     showCancelButton: true,
     confirmButtonColor: '<i class="fa-solid fa-check"></i>, Si eliminar',
     cancelButtonColor: '<i class="fa-solid fa-ban"></i> Cancelar'
 }).then(result => {
     if (result.isConfirmed) {
       enviarSolicitud('Delete',{id:id},url);
     }
     else {
       show_Alert('operacion cancelada','info');
     }
 })
}
export function enviarSolicitud(metodo,parametros,url,mensaje){
    axios({method:metodo,url:url,data:parametros}).then(function (respuesta){
        let status = respuesta.data[0]['status'];
        if (status === 'success'){
            show_Alert(mensaje,status);
            window.setTimeout(function(){
                window.location.href='/';
            },1000);
        }
        else{
            let listado='';
            let errores = respuesta.data[1]['errors'];
            Object.keys(errores).forEach(key => listado += errores[key][0]+'.'
            );
            show_Alert(listado,'error');
        }
    }).catch(function(error){
        show_Alert('Error en la Solicitud','error');
        }

    )}