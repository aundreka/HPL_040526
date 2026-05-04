const imageModules = import.meta.glob(
  "./**/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}",
  { eager: true, import: "default" }
);

const audioModules = import.meta.glob(
  "./**/*.{mp3,wav,ogg,m4a,MP3,WAV,OGG,M4A}",
  { eager: true, import: "default" }
);

export const PRELOAD_IMAGE_URLS = Object.values(imageModules);
export const PRELOAD_AUDIO_URLS = Object.values(audioModules);
