import { Injectable } from "@nestjs/common";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { uniqBy } from "lodash";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class StorageService {
  constructor(private readonly container: string) {}

  private readonly client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
  });

  async uploadPublicFile(dataBuffer: Buffer, fileName: string) {
    const command = new PutObjectCommand({
      Bucket: this.container,
      Key: fileName,
      Body: dataBuffer,
    });

    const response = await this.client.send(command);
    return response;
  }

  async getFiles(folderName: string) {
    const command = new ListObjectsV2Command({
      Bucket: this.container,
      Prefix: folderName,
    });

    let isTruncated = true;
    const contents = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await this.client.send(command);

      if (typeof Contents !== "undefined" && Contents !== null) {
        contents.push(...Contents);
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      } else {
        break;
      }
    }

    const filteredData = uniqBy(contents, "Key");
    return filteredData;
  }

  async downloadFile(key: string, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.container,
      Key: key,
    });
    const url = await getSignedUrl(this.client, command, {
      expiresIn,
    });

    return url;
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.container,
      Key: key,
    });
    const response = await this.client.send(command);
    return response;
  }
}
