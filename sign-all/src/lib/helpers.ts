export const convertImageToBlob = async (imageFile: File) => {
    const imageBlob = await new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer
            const type = imageFile?.type || "image/png"
            const blob = new Blob([arrayBuffer], { type })
            resolve(blob)
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(imageFile)
    })

    return imageBlob
}
