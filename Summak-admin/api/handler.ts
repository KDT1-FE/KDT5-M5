import type { VercelResponse, VercelRequest } from "@vercel/node";

export default function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const id = request.query.id;
    const password = request.query.password;

    if (process.env.ADMIN_ID != id || process.env.ADMIN_PASSWORD != password)
      return response.status(200).json({
        isAdmin: false,
      });

    response.status(200).json({
      isAdmin: true,
    });
  } catch (error) {
    console.error(error);
    response.status(200).json({
      hi: "failure",
    });
  }
}
