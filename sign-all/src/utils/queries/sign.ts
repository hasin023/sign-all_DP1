import Sign from "../models/Sign";

export const getSigns = async (page = 1, limit = 20) => {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    // Calculate the number of items to skip
    const skip = (page - 1) * limit;
    const signs = await Sign.find().skip(skip).limit(limit).sort({ word: 1 });
    const totalItems = await Sign.countDocuments();
    return {
        contents: signs,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page
    };
}

export const getRandom4Words = async () => {
    const signs = await Sign.aggregate([{ $sample: { size: 4 } }]);
    return signs;
}