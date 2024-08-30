// export default () => ({});

export default ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-upload-minio-v4",
      providerOptions: {
        accessKey: env("MINIO_ACCESS_KEY"),
        secretKey: env("MINIO_SECRET_KEY"),
        bucket: env("MINIO_BUCKET"),
        endPoint: env("MINIO_ENDPOINT"),
        port: parseInt(env("MINIO_PORT") || "443", 10),
        useSSL: true,
        folder: "upload",
        host: env("MINIO_HOST"),
      },
    },
  },
});
