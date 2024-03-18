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
      // const imgFetch = await loadImage("https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg");
      // const response = await fetch("https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg");
      // const imageBuffer = await response.arrayBuffer(); // Convert response body to ArrayBuffer
      // // Convert the ArrayBuffer to a Buffer
      // const buffer = Buffer.from(imageBuffer);
      // // Load the image into a canvas
      // const image = new Image();
      // image.src = buffer;
      // await new Promise((resolve, reject) => {
      //   image.onload = resolve;
      //   image.onerror = reject;
      // });
      // const canvas = createCanvas(image.width, image.height);
      // const ctx = canvas.getContext("2d");
      // ctx.drawImage(image, 0, 0);
      // const detections = await faceapi.detectSingleFace(canvas).withFaceLandmarks().withFaceDescriptor();
      // const res = await this.faceDetectService.markLabelWithImages([{ mssv: 51900587, images: ["aaaa"] }]);
      // console.log(res);
    } catch (error) {
      // console.log(error);
    }
    // throw ExceptionFactory.badRequestException({
    //   message: "aksksks",
    //   errorCode: 1,
    // });
  }
}
