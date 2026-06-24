export interface Product {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  inStock: boolean;
  activo: boolean;
  categoria: string;
  order: number;
}