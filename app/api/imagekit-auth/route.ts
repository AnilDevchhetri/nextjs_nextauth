// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    });

    return Response.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  } catch (error) {
    console.log("image uplaod error ", error);
    return Response.json(
      { error: "error is respnse to uplaod iemage" },
      { status: 500 },
    );
  }
}
