import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { convertImageToBlob } from "@/lib/helpers";
import { imageToTextOutput } from "@/lib/hf-handlers";

export default function ImageClassifier() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!imageFile) return;

        setLoading(true);

        // Placeholder: Replace with your image processing logic
        const imageToClassify = await convertImageToBlob(imageFile);
        const response = await imageToTextOutput(imageFile);

        if (response) {
            console.log("Response:", response);

            const imageUrl = URL.createObjectURL(imageToClassify);
            console.log("Image URL:", imageUrl);
        } else {
            console.error("Error:", response);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold text-center">Image to Text</h1>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="file-input" className="font-medium">
                                Upload Image
                            </Label>
                            <Input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="border"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!imageFile || loading}
                            className="w-full hover:bg-gray-100"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Classifying...</span>
                                </div>
                            ) : (
                                "Classify"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/image">
                        <Button variant="outline" size="sm">
                            Back to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
