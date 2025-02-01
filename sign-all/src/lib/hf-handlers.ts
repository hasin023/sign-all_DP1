import hf from "@/config/hf-inference";
import { convertImageToBlob } from "./helpers";

export const imageToTextOutput = async (imageFile: File) => {
    try {
        if (!imageFile) return;

        const imageBlob = await convertImageToBlob(imageFile);

        const output = await hf.imageToText({
            data: imageBlob,
            model: "unsloth/llava-v1.6-mistral-7b-hf-bnb-4bit",
        });

        return output;
    } catch (error) {
        console.error(error);
    }
}