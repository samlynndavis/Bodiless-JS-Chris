module.exports = async ({ config, mode }) => {
  console.log(config.module.rules);
  config.module.rules.push(
            {
              test: (file) =>
                file.endsWith("js") && file.includes("gatsby/cache-dir"),
              loader: "babel-loader",
              // options: babelConfig,
            },
            // {
            //   test: /\.(js|jsx|mjs|ts|tsx)$/,
            //   loader: "babel-loader",
            //   // options: babelConfig,
            //   exclude: [
            //     (file) => {
            //       if (file.includes("gatsby-browser-entry")) {
            //         return false;
            //       }
            //       return file.includes("node_modules");
            //     },
            //   ],
            // },

  );
  return config;
}