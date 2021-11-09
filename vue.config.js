// vue.config.js
const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      auto_add_stylus(config.module.rule("stylus").oneOf(type))
    );
  },
};

function auto_add_stylus(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/stylus/colors.styl"),
        path.resolve(__dirname, "./src/assets/stylus/vars.styl"),
        path.resolve(__dirname, "./src/assets/stylus/components.styl"),
        path.resolve(__dirname, "./src/assets/stylus/macros.styl"),
      ],
    });
}
