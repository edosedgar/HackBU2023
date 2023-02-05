const {
  override,
  addWebpackModuleRule,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src"),
  }),
  addWebpackModuleRule({
    test: /\.less$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  }),
  addWebpackModuleRule({
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              {
                name: "removeViewBox",
                active: false
              }
            ],
          },
        },
      },
    ],
  })
);
