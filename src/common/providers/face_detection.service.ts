import { Injectable } from "@nestjs/common";
import * as faceapi from "face-api.js";
import { join } from "path";

@Injectable()
export class FaceDetectionService {
  constructor() {
    const modelsPath = "public/assets/" + "models";
    faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
    faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
    faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
  }

  async markLabelWithImages(payload: { mssv: number; images: string[] }[]) {
    const result = await payload.map((data) => {
      const descriptions = [];
      let imgFetch;
      let detections;
      data.images.forEach(async (image) => {
        imgFetch = await faceapi.fetchImage(`https://facial-detect-app.s3.ap-southeast-1.amazonaws.com/public/vannghe.jpg`);
        // imgFetch = await faceapi.fetchImage(join(__dirname, "../../../public/assets", "models"));
        detections = await faceapi.detectSingleFace(imgFetch).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      });

      return new faceapi.LabeledFaceDescriptors(data.mssv.toString(), descriptions);
    });

    return result;
  }

  async recognizeFaces(image: Express.Multer.File, compareSource: faceapi.LabeledFaceDescriptors[]) {
    const faceMatcher = new faceapi.FaceMatcher(compareSource, 0.6);

    const blobImage = new Blob([image.buffer]);
    const imgElement: HTMLImageElement = await faceapi.bufferToImage(blobImage);
    const detections = await faceapi.detectAllFaces(imgElement).withFaceLandmarks().withFaceDescriptors();
    const matches = detections.map((detection) => faceMatcher.findBestMatch(detection.descriptor));
    console.log(matches);
    return matches;
  }
}
