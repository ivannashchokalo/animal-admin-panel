import { useDropzone } from "react-dropzone";

interface DropzoneFieldProps {
  value: File[];
  onChange: (files: File[] | string) => void;
}

export default function DropzoneField({ value, onChange }: DropzoneFieldProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles) {
        onChange(acceptedFiles);
      }
    },
  });
  return (
    <div
      {...getRootProps()}
      style={{
        width: 600,
        height: 100,
        backgroundColor: "yellow",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive && "Drop the image here."}
      {!isDragActive &&
        (value.length > 0
          ? value.map((file) => file.name).join(", ")
          : "Drop image here or click")}
    </div>
  );
}
