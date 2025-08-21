import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/styles");
  eleventyConfig.addPassthroughCopy("public");

  // Add official plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Development server configuration
  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true,
    // Enable hot reload for better DX
    liveReload: true,
    domDiff: true
  });

  // Watch for changes in assets
  eleventyConfig.addWatchTarget("src/assets/");

  // Custom date filter for blog posts
  eleventyConfig.addFilter("dateFormat", (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  });

  // Create collections for blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Set custom directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    // Use Nunjucks for templates (Vue will override for .vue files later)
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};