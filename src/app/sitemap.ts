import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pravozakonn.vercel.app/",
      lastModified: new Date(),
    },

    {
      url: "https://pravozakonn.vercel.app/bankrotstvo",
      lastModified: new Date(),
    },

    {
      url: "https://pravozakonn.vercel.app/privacy",
      lastModified: new Date(),
    },

    {
      url: "https://pravozakonn.vercel.app/terms",
      lastModified: new Date(),
    },
  ];
}