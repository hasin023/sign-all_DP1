import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = process.env.NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN

if (!HF_ACCESS_TOKEN) {
    throw new Error("Missing HUGGINGFACE_ACCESS_TOKEN in .env.local")
}

const hf = new HfInference(HF_ACCESS_TOKEN)

export default hf