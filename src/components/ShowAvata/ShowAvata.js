import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function VideoUploader({ defaultSrc, onChange, accept }) {
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (defaultSrc) {
      setFileList([
        {
          uid: "1",
          name: defaultSrc,
          url: defaultSrc,
          status: "done",
        },
      ]);
      return;
    }
    setFileList([]);
  }, [defaultSrc]);

  const _uploadFile = async (blob) => {
    const form = new FormData();
    form.append("app_id", 2);
    form.append("file", blob);
    try {
      const result = await Axios({
        method: "POST",
        url: `https://filer.vipn.net/file/`,
        data: form,
      });

      if (!result.data.success) {
        throw result;
      }
      return result;
    } catch (error) {
      message.error("Upload Error!");
      console.log("Lỗi");
    }
  };

  const handleFileChange = (e) => {
    if (e.file && e.file.status !== "removed") {
      setFileList([e.file]);
      setIsUploading(true);
      _uploadFile(e.file).then(() => {
        setIsUploading(false);
      });
      return;
    }
    setFileList([]);
    onChange();
  };

  return (
    <Upload
      accept={accept}
      fileList={fileList}
      onChange={handleFileChange}
      disabled={isUploading}
      showUploadList={{
        showDownloadIcon: true,
      }}
      beforeUpload={() => false}
    >
      <Button
        disabled={isUploading}
        icon={isUploading ? <LoadingOutlined /> : <UploadOutlined />}
      >
        Upload
      </Button>
    </Upload>
  );
}
export default VideoUploader;
