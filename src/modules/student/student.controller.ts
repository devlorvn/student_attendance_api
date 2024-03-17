import { Controller, Get } from "@nestjs/common";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { StudentService } from "./student.service";
import { FaceDetectionService } from "src/common/providers/face_detection.service";
import * as faceapi from "face-api.js";
import * as canvas from "canvas";
import { join } from "path";

@Controller("student")
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly faceDetectService: FaceDetectionService
  ) {}

  @Get("/test")
  async test() {
    try {
      // const modelsPath = join(__dirname, "../../public/assets", "models");
      // const modelsPath = "public/assets/" + "models";

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

      const imgFetch = await canvas.loadImage("https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg");
      //   const img = new canvas.Image(); // Create a new canvas.Image object
      //   img.src = imgFetch.src;

      //   await new Promise((resolve, reject) => {
      //     img. = resolve;
      //     img.onerror = reject;
      // });

      // const cv = canvas.createCanvas(imgFetch.width, imgFetch.height);
      // const ctx = cv.getContext("2d");
      // ctx.drawImage(imgFetch, 0, 0, imgFetch.width, imgFetch.height);

      // const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
      // const imgFetch = await faceapi.bufferToImage(res);
      console.log(imgFetch);
    } catch (error) {
      console.log(error);
    }
    // throw ExceptionFactory.badRequestException({
    //   message: "aksksks",
    //   errorCode: 1,
    // });
  }
}
