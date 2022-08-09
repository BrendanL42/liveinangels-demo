const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withVideos = require("next-videos");

module.exports = withPlugins(
  [
    [
      withImages,
      {
        /* plugin config here ... */
      },
    ],
    [
      withVideos,
      {
        /* plugin config here ... */
      },
    ],
  ],
  {
    /* global config here ... */
  }
);
