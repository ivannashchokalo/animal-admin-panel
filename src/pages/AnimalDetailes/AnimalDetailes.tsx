import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { deleteAnimal, fetchAnimalById } from "../../services/animalsService";
import clsx from "clsx";
import css from "./AnimalDetailes.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Modal from "../../components/Backdrop/Modal";
import UpdateAnimalForm from "../../components/UpdateAnimalForm/UpdateAnimalForm";

export default function AnimalDetailes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => fetchAnimalById(id),
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteAnimal,
    onMutate: () => {
      toast.loading("Deleting...");
    },
    onSuccess: () => {
      navigate("/animals");
      toast.dismiss();
      toast.success("Deleted");
    },
    onError: () => toast.error("Error"),
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}
      <Toaster />
      {data && (
        <div>
          <img
            src="https://picsum.photos/id/237/200/300"
            alt={data.name}
            width={300}
          />
          <div>
            <h2>{data.name}</h2>
            <p>{data.breed}</p>
            <p>{data.birthDate}</p>

            <p>{data.description}</p>
            <p>{data.price}$</p>
            <span className={clsx(css.badge, css[data.status])}></span>
            <button type="button" onClick={() => setIsConfirmOpen(true)}>
              Delete
            </button>
            <button type="button" onClick={() => setIsUpdateOpen(true)}>
              Edit
            </button>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <Modal onModalClose={() => setIsConfirmOpen(false)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: 400,
              height: 100,
            }}
          >
            <p>Are you sure?</p>
            <button onClick={() => mutateDelete(id)}>Yes</button>
            <button onClick={() => setIsConfirmOpen(false)}>Cancel</button>
          </div>
        </Modal>
      )}
      {isUpdateOpen && (
        <Modal onModalClose={() => setIsUpdateOpen(false)}>
          <UpdateAnimalForm animal={data} />
        </Modal>
      )}
    </div>
  );
}
