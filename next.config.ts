import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Ensure withPayload is applied exactly once
export default withPayload(nextConfig);
