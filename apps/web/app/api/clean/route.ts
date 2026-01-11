import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { NextResponse } from "next/server";
import { withError, type RequestWithLogger } from "@/utils/middleware";
import {
  cleanThread,
  cleanThreadBody,
  type CleanThreadBody,
} from "@/utils/clean/clean-thread";

export type { CleanThreadBody };

export const POST = withError(
  verifySignatureAppRouter(async (request: Request) => {
    const json = await request.json();
    const body = cleanThreadBody.parse(json);

    await cleanThread({
      ...body,
      logger: (request as RequestWithLogger).logger,
    });

    return NextResponse.json({ success: true });
  }),
);
