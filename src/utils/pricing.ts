import { Product } from "../types/product";

export function tieneMayoreo(product: Product): boolean {
  return Boolean((product.cantidadMayoreo ?? 0) > 0 && (product.precioMayoreo ?? 0) > 0);
}

export function getUnitPrice(product: Product, quantity: number): number {
  if (tieneMayoreo(product) && quantity >= product.cantidadMayoreo) {
    return product.precioMayoreo;
  }

  return product.precio;
}
