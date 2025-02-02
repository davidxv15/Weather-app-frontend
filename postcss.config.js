module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'backdrop-filter': true,  // ✅ Enables backdrop-filter support
        'custom-properties': true // ✅ Ensures CSS variables work properly
      }
    }),
    require('autoprefixer'),
  ],
};
