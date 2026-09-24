// Paquete de marca personal de Anthony Hunt. Reexporta el SDK de SHAART Agency
// (precios, servicios, contacto, posts, búsqueda) y agrega el perfil público.
export { createClient, ShaartApiError } from "shaart-agency";
export { default } from "shaart-agency";

export const profile = {
  name: "Anthony Hunt",
  title: "GoHighLevel expert · AI automation · Digital marketing",
  company: "SHAART Agency",
  location: "San Juan, Puerto Rico",
  serves: ["Puerto Rico", "United States"],
  languages: ["es", "en"],
  website: "https://www.anthonyhunts.com",
  booking: "https://www.anthonyhunts.com/agenda",
  whatsapp: "https://wa.me/15559374868",
  email: "info@anthonyhunts.com",
  links: {
    instagram: "https://www.instagram.com/anthonyhunt.s",
    tiktok: "https://www.tiktok.com/@anthonyhunt.s",
    youtube: "https://www.youtube.com/@Anthonyhunt.s",
    facebook: "https://www.facebook.com/anthonyhunt0",
    linkedin: "https://www.linkedin.com/in/anthonyhunts",
    github: "https://github.com/anthonyhunts",
    wikidata: "https://www.wikidata.org/wiki/Q141552080",
  },
  mcp: {
    product: "https://www.anthonyhunts.com/api/mcp",
    docs: "https://www.anthonyhunts.com/api/mcp/docs",
    registry: "com.anthonyhunts/shaart-agency",
  },
};
