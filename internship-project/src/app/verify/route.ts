
import { NextRequest, NextResponse } from "next/server";
import { generateKeyPairSync, createSign, createVerify } from "crypto";

const NAME = "Matej Minoski";
const GITHUB_ID = "matejm";
const DATE = new Date().toISOString().split("T")[0].replace(/-/g, "");


export async function POST(req: NextRequest) {
  const { name, githubId } = await req.json();

  if (name !== NAME || githubId !== GITHUB_ID) {
    return NextResponse.json(
        { verified: false, messages: "Identity verification failed" },
        { status: 401 }
    );
  }

  const message = `BLOCKIA-${NAME}-${GITHUB_ID}-${DATE}`;

  const { privateKey, publicKey } = generateKeyPairSync("ec", {
    namedCurve: "prime256v1",
  });

  const sign = createSign("SHA256");
  sign.update(message).end();
  const signature = sign.sign(privateKey).toString("base64");

  const verify = createVerify("SHA256");
  verify.update(message).end();
  const isValid = verify.verify(publicKey, Buffer.from(signature, "base64"));

  return NextResponse.json({
    verified: isValid,
    messages: isValid ? "Identity verified successfully" : "Verification failed",
    signature,
    publicKey: publicKey.export({ type: "spki", format: "pem" }),
  });
}
