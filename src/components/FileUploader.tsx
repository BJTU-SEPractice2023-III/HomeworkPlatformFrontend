import { DeleteOutline } from "@suid/icons-material";
import { Button } from "@suid/material";
import { For } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";

export default function FileUploader(props: { files: Store<File[]>, setFiles: SetStoreFunction<File[]> }) {
  const { files, setFiles } = props
  return (
    <>
      <Button variant='outlined'>
        <input
          type="file"
          name="attachment"
          onChange={(event) => { setFiles([...files, ...event.target.files]) }}
          class="opacity-0 absolute inset-0"
          multiple
          required
        />
        上传文件
      </Button>
      <div class='flex gap-2'>
        <For each={files}>{(file, index) =>
          <div class='rounded border-[#dddddd] border-solid flex flex-col flex-items-stretch w-30 h-30 p-4 hover:bg-[#00000002] border-[#777777] cursor-pointer relative group'>
            <div class='absolute inset-0 flex justify-center items-center invisible group-hover:visible' onClick={() => {
              setFiles(files.filter((file, i) => i != index()))
            }}>
              <DeleteOutline sx={{ fontSize: 40, color: '#cccccc', fontWeight: 300 }} />
            </div>
            <span class='text-sm flex-1 break-all text-wrap truncate'>{file.name}</span>
            <span class='text-sm text-[#777777]'>{(file.size / 1024).toFixed(2)} KiB</span>
          </div>
        }
        </For>
      </div>
    </>
  )
}