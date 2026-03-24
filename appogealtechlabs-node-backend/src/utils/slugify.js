/**
 * Simple slugify utility — converts a string into a URL-friendly slug.
 * Equivalent to Django's `slugify()` function.
 * @param {string} str
 * @returns {string}
 */
const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')      // replace spaces/underscores with -
    .replace(/[^\w-]+/g, '')      // remove non-word chars (keep alphanumeric & -)
    .replace(/--+/g, '-')         // collapse multiple dashes
    .replace(/^-+|-+$/g, '');     // strip leading/trailing dashes

module.exports = slugify;
