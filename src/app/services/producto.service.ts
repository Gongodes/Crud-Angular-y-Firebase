import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Producto } from '../modelos/productos.models';
import{map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:any=`${environment.url}productos.json`;

  constructor(private http: HttpClient) { }

  /**
   *
   * @param producto
   */
  guardarProducto(producto:Producto){

    return this.http.post(this.url, producto);

  }

  /**
   *
   */

  obtenerProductos(){

    return this.http.get(this.url).pipe(
      map(this.arregloProducto)
    );

  }

  /**
   *
   * @param prod
   */
arregloProducto(prod: any){

  console.log("producto: " ,prod);

  let productos: Producto[]=[];

  if(prod !== null){
    Object.keys(prod).forEach(llave =>{
      let producto: Producto = prod[llave];
      producto.id=llave;
      productos.push(producto);
    });

  }
  return productos;
}

/**
 *
 * @param producto
 */
actualizarProducto(producto:Producto){

console.log("producto a actualizar: ", producto.id);

const prodAux = {...producto};

delete prodAux.id;

return this.http.put(`${environment.url}productos/${producto.id}.json`,prodAux)

}


eliminarProducto(id:any){

 return this.http.delete(`${environment.url}productos/${id}.json`);

}

}
