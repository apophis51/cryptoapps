/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
    webpack: (config, context) => {
        if (config.plugins) {
          config.plugins.push(
            new context.webpack.IgnorePlugin({
              resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
            }),
          )
        }
        return config
      },
}

module.exports = nextConfig
