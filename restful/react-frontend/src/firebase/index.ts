import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export const uploadFile = async (
    file: File,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setLoading(true)
        const imageRef = ref(storage, `profile/${file.name + "-" + Date.now().toString()}`);
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}