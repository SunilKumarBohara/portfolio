export interface SiteConfig {
  name: string;
  role: string;
  title: string;
  location: string;
  country: string;
  availability: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website?: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Sunil Kumar Bohara",
  role: "SEO Executive",
  title: "Sunil Kumar Bohara — SEO Executive | Technical SEO, GEO & AEO",
  location: "Kathmandu, Nepal",
  country: "Nepal",
  availability: "Available for SEO Projects & Strategy Consultations",
  email: "sunilbohara3000@gmail.com",
  socials: {
    github: "https://github.com/SunilKumarBohara",
    linkedin: "https://www.linkedin.com/in/sunil-kumar-bohara/",
    facebook: "https://www.facebook.com/sunilkumarbohara99",
    instagram: "https://www.instagram.com/sunilkumarbohara7/",
    twitter: "https://x.com/SunilBohara66",
    website: "https://sunilkumarbohara.com",
  },
  seo: {
    siteUrl: "https://sunilkumarbohara.com",
    defaultTitle: "Sunil Kumar Bohara — SEO Executive | Technical SEO, GEO & AEO Nepal",
    titleTemplate: "%s | Sunil Kumar Bohara",
    defaultDescription:
      "Sunil Kumar Bohara is an SEO Executive based in Nepal specializing in Technical SEO, Keyword Research, Content Strategy, Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO).",
    keywords: [
      "Sunil Kumar Bohara",
      "SEO Executive",
      "SEO Executive Nepal",
      "SEO Nepal",
      "SEO",
      "GEO",
      "AEO",
      "Generative Engine Optimization",
      "Answer Engine Optimization",
      "Technical SEO Nepal",
      "Search Engine Optimization Kathmandu",
      "Keyword Strategy",
      "On-Page SEO",
      "Off-Page SEO",
      "Core Web Vitals",
      "Schema.org Structured Data",
    ],
    ogImage: "/og-image.png",
  },
};
