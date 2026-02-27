export interface NASTImage {
  type: "image";
  url: string;
  title: string | null | undefined;
  alt: string | null | undefined;
  data: {
    fileType: "file" | "external";
    expiryTime?: string;
    caption?: Array<any>;
    blockId?: string;
  };
}


export interface DownloadedImage {
  url: string;
  contentType: string;
  data: ArrayBuffer;
}

export interface Block {
  type: string;
  [key: string]: any;
}

export interface FetchImagesResult {
  images: DownloadedImage[];
  imageCount: number;
  imageFileCount: number;
  imageExternalCount: number;
  expiredCount: number;
}
