import { useDropzone } from "react-dropzone";
import styles from "./DropzoneField.module.scss";

interface DropzoneFieldProps {
  value: File[];
  onChange: (files: File[]) => void;
  id?: string;
}

export default function DropzoneField({
  value,
  onChange,
  id,
}: DropzoneFieldProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()} className={styles.dropZone}>
      <input {...getInputProps({ id })} />

      <div className={styles.content}>
        <img
          src="../../../public/upload.svg"
          alt="Drop zone icon"
          width={52}
          height={52}
          className={styles.dropIcon}
        />

        <p className={styles.title}>
          {isDragActive
            ? "Drop the files here..."
            : "Drop your files here or browse"}
        </p>

        <p className={styles.subtitle}>Max file size up to 1 GB</p>

        {value?.length > 0 && (
          <p className={styles.files}>{value.map((f) => f.name).join(", ")}</p>
        )}
      </div>
    </div>
  );
}
