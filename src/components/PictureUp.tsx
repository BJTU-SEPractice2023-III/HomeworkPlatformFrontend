// 导入所需的库和组件
import { Button, Modal, Paper } from "@suid/material";
import { Accessor, createSignal, Setter } from "solid-js";
import { headerPicture } from "../lib/user";

export default function PersonalizedSignatureModel(props: { open: Accessor<boolean>, setOpen: Setter<boolean> }) {
  const { open, setOpen } = props;

  const [selectedFile, setSelectedFile] = createSignal(null);
  let fileInput;

  const allowedFileExtensions = ["jpg", "jpeg", "png", "gif"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (allowedFileExtensions.includes(fileExtension)) {
        setSelectedFile(file);
        headerPicture(file);
        window.location.reload();
      } else {
        alert('请选择 jpg、png 或 gif 格式的文件');
        fileInput.value = '';
      }
    }
  };

  return (
    <>
      <Modal
        open={open()}
        onClose={() => { setOpen(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            maxWidth: "1000px",
            maxHeight: "80%",
            overflowY: "auto",
            boxShadow: "24px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1
          }}
        >
          <div>
            <input
              type="file"
              class="hidden"
              onChange={handleFileChange}
              ref={(input) => (fileInput = input)}
            />
            <Button
              class="bg-secondary text-white py-2 px-4 rounded cursor-pointer"
              onClick={() => fileInput.click()}
            >
              选择图片
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
}
