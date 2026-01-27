import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

// Sanity Project ID ve Dataset
const projectId = "a81gtm88";
const dataset = "production";

export default defineConfig({
  name: "ahmet-can-tonus-hukuk",
  title: "Ahmet Can Tonus Hukuk Bürosu",
  
  projectId,
  dataset,
  
  // basePath kaldırıldı - Studio artık Sanity'nin hosted Studio'sunda çalışacak
  // Studio'ya erişim: https://ahmet-can-tonus-hukuk.sanity.studio
  
  plugins: [
    structureTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
});
