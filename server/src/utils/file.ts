import fs from "fs";
import path from "path";

export function deleteFileByUrl(fileUrl?: string | null) {
  if (!fileUrl) return;
  try {
    const fileName = fileUrl.split("/uploads/")[1];
    if (!fileName) return;

    const filePath = path.join(process.cwd(), "uploads", fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.log("FILE_DELETE_ERROR", error);
  }
}
