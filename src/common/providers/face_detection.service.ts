import { Injectable } from "@nestjs/common";
import * as faceapi from "face-api.js";
import { join } from "path";
import { Canvas, Image, ImageData as NodeImageData, createCanvas } from "canvas";

@Injectable()
export class FaceDetectionService {
  // constructor() {
  //   this.init();
  //   const modelsPath = "public/assets/" + "models";
  //   faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
  //   faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
  //   faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
  // }
  // async init() {
  //   faceapi.env.monkeyPatch({
  //     Canvas: Canvas as unknown as typeof HTMLCanvasElement,
  //     Image: Image as any as typeof HTMLImageElement,
  //     ImageData: NodeImageData as any as typeof ImageData,
  //   });
  // }
  // async markLabelWithImages(payload: { mssv: number; images: string[] }[]) {
  //   const result = await payload.map((data) => {
  //     const descriptions = [];
  //     let imgFetch;
  //     let detections;
  //     data.images.forEach(async (image) => {
  //       // const res = await (await fetch(`https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg`)).blob();
  //       // const img = await faceapi.bufferToImage(res);
  //       imgFetch = await faceapi.fetchImage("https://i.imgur.com/V1Yj7Al.png");
  //       // imgFetch = await faceapi.fetchImage(join(__dirname, "../../../public/assets", "models"));
  //       detections = await faceapi.detectSingleFace(imgFetch).withFaceLandmarks().withFaceDescriptor();
  //       descriptions.push(detections.descriptor);
  //     });
  //     return new faceapi.LabeledFaceDescriptors(data.mssv.toString(), descriptions);
  //   });
  //   return result;
  // }
}
