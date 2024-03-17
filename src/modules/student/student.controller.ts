import { Controller, Get } from "@nestjs/common";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { StudentService } from "./student.service";
import { FaceDetectionService } from "src/common/providers/face_detection.service";
import * as faceapi from "face-api.js";
import { Canvas, Image, ImageData, loadImage, createCanvas } from "canvas";
import { join } from "path";
import * as fs from "fs";
import { log } from "console";

@Controller("student")
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly faceDetectService: FaceDetectionService
  ) {}

  @Get("/test")
  async test() {
    try {
      // async function downloadImage(url, filename) {
      //   try {
      //     const response = await fetch(url);
      //     const arrayBuffer = await response.arrayBuffer();
      //     const imageData = Buffer.from(arrayBuffer);

      //     const directory = "public"; // Thư mục mà bạn muốn lưu hình ảnh vào
      //     const filePath = join(directory, filename);

      //     fs.writeFileSync(filePath, imageData); // Ghi dữ liệu hình ảnh vào tệp
      //     console.log(`Image downloaded successfully to ${filePath}`);
      //   } catch (error) {
      //     console.error("Error downloading image:", error);
      //   }
      // }

      // Gọi hàm downloadImage với URL của hình ảnh và tên tệp bạn muốn lưu
      // downloadImage("https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg", "vannghe.jpg");

      // const modelsPath = join(__dirname, "../../public/assets", "models");
      // const modelsPath = "public/assets/" + "models";
      // faceapi.env.monkeyPatch({ Canvas, Image, ImageData } as any);
      // await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
      // await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
      // await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
      // const source = await this.faceDetectService.markLabelWithImages([
      //   {
      //     mssv: 51900587,
      //     images: ["51900587.jpg"],
      //   },
      // ]);
      // console.log(join(__dirname, "../../public/assets", "images", "51900587.jpg"));

      // const imgFetch = await loadImage("https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg");
      // const res = await fetch(`https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg?Content-Type=image/jpeg`, {
      //   headers: { "Content-Type": "image/*" },
      // }).then(async (d) => await d.blob());
      // console.log(res);
      // const imgFetch = await faceapi.fetchImage(`public/vannghe.jpg`);
      const publicDirectory = join(__dirname, "../../..", "public");
      console.log(publicDirectory);
      const imgPath = join(publicDirectory, "vannghe.jpg");
      console.log(imgPath);
      const imageBuffer = fs.readFileSync(imgPath);
      console.log(imageBuffer);

      // const img = await loadImage(imageBuffer);

      const imgFetch = await faceapi.fetchImage(imgPath);

      // const imgFetch = await faceapi.bufferToImage(imageBuffer);

      // const img = new Image(); // Create a new canvas.Image object
      // img.src = imgFetch.src;

      //   await new Promise((resolve, reject) => {
      //     img. = resolve;
      //     img.onerror = reject;
      // });

      // const cv = createCanvas(imgFetch.width, imgFetch.height);
      // const ctx = cv.getContext("2d");
      // ctx.drawImage(imgFetch, 0, 0, imgFetch.width, imgFetch.height);
      // const imageData = ctx.getImageData(0, 0, cv.width, cv.height);
      const detections = await faceapi.detectSingleFace(imgFetch).withFaceLandmarks().withFaceDescriptor();
      // console.log(detections);
    } catch (error) {
      console.log(error);
    }
    // throw ExceptionFactory.badRequestException({
    //   message: "aksksks",
    //   errorCode: 1,
    // });
  }
}
