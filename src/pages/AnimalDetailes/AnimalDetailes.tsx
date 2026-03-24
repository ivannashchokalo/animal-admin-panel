import { useLocation, useNavigate, useParams } from "react-router";
import clsx from "clsx";
import styles from "./AnimalDetailes.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Icon from "../../components/Icon/Icon";
import Modal from "../../components/Modal/Modal";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Select from "react-select";
import type { OptionType } from "../../types/select";
import { selectStyles } from "../../components/Select/selectStyles";
import DropdownIndicator from "../../components/Select/DropdownIndicator";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  useDeleteAnimalMutation,
  useGetAnimalByIdQuery,
  useUpdateAnimalMutation,
} from "../../services/animalsApi";

export default function AnimalDetailes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const location = useLocation();
  // const queryClient = useQueryClient();

  const { data, isLoading, isError } = useGetAnimalByIdQuery(id);
  const [deleteAnimal] = useDeleteAnimalMutation();
  const [updateAnimal] = useUpdateAnimalMutation();

  const handleDelete = async () => {
    try {
      toast.loading("Deleting...");

      await deleteAnimal(id).unwrap();

      toast.dismiss();
      toast.success("Deleted");

      navigate("/animals");
    } catch {
      toast.dismiss();
      toast.error("Error");
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!id) return;

    try {
      toast.loading("Updating...");

      await updateAnimal({
        id,
        status,
      }).unwrap();

      toast.dismiss();
      toast.success("Updated");
    } catch (error) {
      toast.dismiss();
      toast.error("Error");
    }
  };

  const options: OptionType[] = [
    { value: "available", label: "Available" },
    { value: "reserved", label: "Reserved" },
    { value: "sold", label: "Sold" },
  ];

  return (
    <Section>
      <Toaster />
      <Container>
        <div className={styles.btnsWrapper}>
          <Breadcrumbs
            items={[
              { title: "Animals", path: location.state?.from || "/animals" },
              { title: "Animal details" },
            ]}
          />
          <div className={styles.changeBtnWrapper}>
            <Select
              options={options}
              value={options.find((option) => option.value === data?.status)}
              onChange={(option: OptionType) => {
                handleUpdateStatus(option.value);
              }}
              isSearchable={false}
              styles={selectStyles}
              components={{
                IndicatorSeparator: null,
                DropdownIndicator,
              }}
            />

            <button
              className={styles.editBtn}
              onClick={() =>
                navigate("edit", {
                  state: { from: location.state?.from || "/animals" },
                })
              }
            >
              <Icon name="edit" size={16} className={styles.editIcon} />
              Edit
            </button>
          </div>
        </div>
        <Toaster />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error!</p>}
        {data && (
          <div className={styles.detailesWrapper}>
            <div>
              <img
                className={styles.animalImg}
                src="https://picsum.photos/id/237/200/300"
                alt={data.name}
                width={300}
              />
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.contentWrapper}>
                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Name:</p>
                  <h2 className={styles.desText}>{data.name}</h2>
                </div>

                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Type:</p>
                  <p className={styles.desText}>{data.type}</p>
                </div>

                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Breed:</p>
                  <p className={styles.desText}>{data.breed}</p>
                </div>
                <div
                  className={clsx(styles.flexWrapper, styles.smoleGapWrapper)}
                >
                  <p className={styles.desTitle}>Sex:</p>
                  <p className={styles.desText}>
                    {data.sex?.charAt(0).toUpperCase() + data.sex?.slice(1)}
                  </p>
                </div>

                {data.birthDate && (
                  <div
                    className={clsx(styles.flexWrapper, styles.bigGapWrapper)}
                  >
                    <p className={styles.desTitle}>Data of Birth:</p>
                    <p className={styles.desText}>
                      {new Date(data?.birthDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className={clsx(styles.flexWrapper, styles.bigGapWrapper)}>
                  <p className={styles.desTitle}>Status:</p>
                  <span className={clsx(styles.badge, styles[data.status])}>
                    {data.status?.charAt(0).toUpperCase() +
                      data.status?.slice(1)}
                  </span>
                </div>
                {data.price && (
                  <div
                    className={clsx(styles.flexWrapper, styles.bigGapWrapper)}
                  >
                    <p className={styles.desTitle}>Price:</p>
                    <p className={styles.desPrice}>{data?.price}$</p>
                  </div>
                )}
              </div>

              <p className={clsx(styles.desTitle, styles.desPos)}>
                Description:
              </p>
              <p className={clsx(styles.desText, styles.desBorder)}>
                {data.description}
              </p>
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={() => setIsConfirmOpen(true)}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {isConfirmOpen && (
          <Modal onModalClose={() => setIsConfirmOpen(false)}>
            <Icon name="warning" size={40} className={styles.modalIcon} />
            <h2 className={styles.modalTitle}>Delete card</h2>
            <p className={styles.modalText}>
              Are you sure you want to delete this card?
            </p>
            <div className={styles.modalBtnsWrapper}>
              <button
                className={clsx(styles.modalBtn, styles.modalBtnCancel)}
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className={clsx(styles.modalBtn, styles.modalBtnDelete)}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </Container>
    </Section>
  );
}
