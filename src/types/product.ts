export interface Product {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  stock: number;
  activo: boolean;
  categoria: string;
}