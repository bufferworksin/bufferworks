export default function sitemap() {
  const baseUrl = "https://bufferworks.in";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // The current architecture is a single-page app, so we just declare the root. 
    // If specific dedicated pages (e.g. /services, /work) are added, we iterate them here.
  ];
}
