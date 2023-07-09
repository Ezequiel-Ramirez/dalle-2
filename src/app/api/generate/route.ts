import { NextResponse } from "next/server";
const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    const body = await request.json();
    const promptSting = body.prompt;

    if (!promptSting) {
        return NextResponse.json(
            { error: "prompt is required" },
            { status: 400 }
        );
    }

    const aiResponse = await openai.createImage({
        prompt: promptSting,
        n: 1,
        size: "512x512",
    });

    return NextResponse.json(
        { url: aiResponse.data.data[0].url },
        { status: 200 }
    );
}
