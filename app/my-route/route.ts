import configPromise from "@payload-config";
import { getPayload } from "payload";

export const GET = async () => {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const data = await payload.find({
      collection: "media",
    });

    return Response.json(data);
  } catch (err) {
    // Log the error server-side and return a JSON error response with status 500
    console.error("GET /my-route failed:", err);
    return Response.json({ error: "Failed to fetch media" }, { status: 500 });
  }
};

// TODO: Consider renaming this route from `my-route` to a more descriptive path like `api/media` or `api/v1/media`.
