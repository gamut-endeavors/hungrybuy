import multer from "multer";
import path from "path";
import fs from "fs";
import { TypedRequest } from "../types/request";
import { NextFunction, Response } from "express";
import { fileTypeFromFile } from "file-type";

const uploadDir = path.join(process.cwd(), "uploads");

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
    } else {
      cb(null, true);
    }
  },
});

export const validateImageSignature = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return next();
    }

    const filePath = req.file.path;
    const fileType = await fileTypeFromFile(filePath);

    if (!fileType || !ALLOWED_FILE_TYPES.includes(fileType.mime)) {
      fs.unlinkSync(filePath);

      return res.status(400).json({ message: "Invalid image file" });
    }

    next();
  } catch (error) {
    console.log("IMAGE_SIGNATURE_ERROR", error);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Image validation failed",
    });
  }
};
