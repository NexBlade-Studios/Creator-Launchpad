import AsyncStorage from "@react-native-async-storage/async-storage";

export type SavedThumbnail = {
    id: string;
    imageUri: string;
    prompt: string;
    category: string;
    createdAt: string;
    mimeType: string;
};

const STORAGE_KEY = "@creator_launchpad_thumbnails";

export async function getThumbnails(): Promise<SavedThumbnail[]> {
    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return [];
        }

        return JSON.parse(stored);
    } catch (error) {
        console.error("Failed to load thumbnails:", error);
        return [];
    }
}

export async function saveThumbnail(
    thumbnail: SavedThumbnail,
): Promise<void> {
    try {
        const existing = await getThumbnails();

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([thumbnail, ...existing]),
        );
    } catch (error) {
        console.error("Failed to save thumnail:", error);
        throw error;
    }
}

export async function deleteThumbnail(
    id: string,
): Promise<void> {
    try {
        const existing = await getThumbnails();

        const updated = existing.filter(
            (thumbnail) => thumbnail.id !== id,
        );

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated),
        );
    } catch (error) {
        console.error("Failed to delete thumbnail:", error);
        throw error;
    }
}
