export interface Product {
  id: string;
  nombre: string;
  precio: number;
  precioMayoreo: number;
  cantidadMayoreo: number;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  inStock: boolean;
  activo: boolean;
  categoria: string;
  order: number;
}