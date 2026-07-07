import { seedHero, deleteHero } from "./seedHero";
import { seedServices, deleteServices } from "./seedServices";
import { seedGallery, deleteGallery } from "./seedGallery";
import { seedTikTok, deleteTikTok } from "./seedTikTok";

export async function seedSiteContent() {
  await seedHero();
  await seedServices();
  await seedGallery();
  await seedTikTok();

  console.log("Contenido inicial del sitio agregado correctamente");
}

export async function deleteSiteContent() {
  await deleteHero();
  await deleteServices();
  await deleteGallery();
  await deleteTikTok();

  console.log("Contenido del sitio eliminado correctamente");
}