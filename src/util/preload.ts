export const preloadImage = async (src: string) => {
  const preloadElem = document.createElement("link");
  preloadElem.rel = "preload";
  preloadElem.as = "image";
  preloadElem.href = src;
  document.head.appendChild(preloadElem);
};
