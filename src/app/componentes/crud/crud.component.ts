import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Producto } from '../../modelos/productos.models';
import {ProductoService} from "../../services/producto.service"
import swal from "sweetalert2";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  productoForm!: FormGroup;
  producto: Producto = new Producto();
  respuestaProd: any[]=[];

  constructor(private fb: FormBuilder, private productoService:ProductoService) { }

  ngOnInit(): void {
  this.iniciaFormulario();
  this.obtenerProductos();

  }

  iniciaFormulario(){

    this.productoForm = this.fb.group({
      nombre:[this.producto.nombre],
      cantidad:[this.producto.cantidad],
      descripcion:[this.producto.descripcion],
      id:[this.producto.id]
    })
  }

  guardar(){
    console.log(this.productoForm);

    if(this.producto.id){
      this.actualizar();
    }else{

    this.producto={
      nombre:this.productoForm.get('nombre')?.value,
      cantidad:this.productoForm.get('cantidad')?.value,
      descripcion:this.productoForm.get('descripcion')?.value,
    }
    this.productoService.guardarProducto(this.producto)
    .subscribe(respuesta =>{
      console.log(respuesta);
      this.obtenerProductos();
      swal.fire({

        text: 'Guardado!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

    }, error=>{this.mostrarError()});
  }
  }

  obtenerProductos(){

    this.productoService.obtenerProductos()
    .subscribe(respuesta => {console.log("lista de productos", respuesta);
    this.respuestaProd = respuesta;

  }, error=>{
    this.mostrarError()
  });




}

mostrarError(){

  swal.fire({
    title: 'Error!',
    text: 'Algo anda mal. Intentalo nuevamente',
    icon: 'error',
    confirmButtonText: 'Aceptar'
  })
}



modificarModelo(prod:any){

  this.producto.id=prod.id;
  this.producto.nombre= prod.nombre;
  this.producto.cantidad= prod.cantidad;
  this.producto.descripcion=prod.descripcion;
  this.iniciaFormulario();
}

actualizar(){

  this.producto={

    nombre:this.productoForm.get('nombre')?.value,
      cantidad:this.productoForm.get('cantidad')?.value,
      descripcion:this.productoForm.get('descripcion')?.value,
      id:this.productoForm.get('id')?.value,
  }

  this.productoService.actualizarProducto(this.producto)
  .subscribe(respuesta =>{

    this.obtenerProductos();
    swal.fire({

      text: 'Actualizado!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })

  },error=>{
    this.mostrarError();
  })
}

eliminar(prod:any){

  swal.fire({
    title: 'Eliminar',
    text: "Vas a eliminar un registro",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
this.productoService.eliminarProducto(prod.id).subscribe(
  respuesta=>{

    this.obtenerProductos();
    swal.fire(
      'Eliminado!',
      'El registro se ha eliminado',
      'success'
    )
  },error =>{
    this.mostrarError();
  }

)


    }
  })

}

limpiarModelo(){

  this.producto={
    nombre:'',
    cantidad:0,
    descripcion:'',
    id:''


  }
  this.iniciaFormulario();
}



}
