import configPromise from "@payload-config";
import { getPayload } from "payload";

export const Home = async () => {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const data = await payload.find({
      collection: "media",
    });

    // Validate shape before rendering
    if (!data || !Array.isArray((data as any).docs)) {
      console.error("Unexpected payload shape for media:", data);
      return (
        <div className="p-6">
          <p className="text-muted-foreground">No media found.</p>
        </div>
      );
    }

    const docs = (data as any).docs;

    return (
      <div className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Media</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc: any) => (
            <div
              key={doc.id ?? doc._id ?? doc.filename ?? JSON.stringify(doc)}
              className="border rounded-md p-4"
            >
              <p className="font-medium">
                {doc.filename ?? doc.name ?? doc.title ?? "Untitled"}
              </p>
              {doc.url ? (
                // Render image if url is present
                // Note: for remote images, ensure next/image or allowed domains are configured if you switch to Image
                <img
                  src={doc.url}
                  alt={doc.filename ?? doc.name ?? "media"}
                  className="mt-2 max-h-48 w-full object-contain"
                />
              ) : (
                <pre className="mt-2 text-sm text-muted-foreground">
                  {JSON.stringify(doc, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (err) {
    // Log the error for server-side debugging and return a friendly fallback
    console.error("Failed to load media:", err);
    return (
      <div className="p-6">
        <p className="text-destructive">
          Failed to load media. Please try again later.
        </p>
      </div>
    );
  }
};

export default Home;
