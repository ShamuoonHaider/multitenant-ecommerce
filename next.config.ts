import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      // Don't externalize 'ws' - bundle it instead
      config.externals = config.externals.filter(
        (external) => typeof external !== "string" || !external.includes("ws")
      );
    }
    return config;
  },
};

// Ensure withPayload is applied exactly once
export default withPayload(nextConfig);
