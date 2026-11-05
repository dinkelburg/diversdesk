/** Shared by the rendered robots meta tag and the article review directory. */
export function getRobotsSettings(robots = "index, follow") {
  const directives = robots.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  return {
    noindex: directives.includes("noindex") || directives.includes("none"),
    nofollow: directives.includes("nofollow") || directives.includes("none"),
    robotsExtras: directives
      .filter((value) => !["index", "follow", "noindex", "nofollow", "all", "none"].includes(value))
      .join(", "),
  };
}
