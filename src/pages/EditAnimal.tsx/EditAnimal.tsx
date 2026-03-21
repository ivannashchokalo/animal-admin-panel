import { Controller, useForm } from "react-hook-form";
import DropzoneField from "../../components/DropzoneField/DropzoneField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from "react-number-format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAnimalById, updateAnimal } from "../../services/animalsService";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

interface UpdateAnimalForm {
  name: string;
  type: "dog" | "cat";
  breed: string;
  sex: "male" | "female";
  birthDate: Date | null;
  price: number;
  description: string;
  photo: File[];
}

export default function EditAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const { data } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => fetchAnimalById(id as string),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateAnimalForm>({
    defaultValues: {
      name: data?.name,
      type: data?.type,
      breed: data?.breed,
      birthDate: data?.birthDate ? new Date(data?.birthDate) : null,
      price: data?.price,
      description: data?.description,
      photo: data?.images,
    },
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: updateAnimal,
    onMutate: () => toast.loading("Updating..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Updated");
      // reset();
      navigate(`/animals/${id}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error");
    },
  });

  const onSubmit = (data: UpdateAnimalForm) => {
    const { photo, ...upData } = data; // тимчасово
    mutation.mutate({
      id: id,
      ...upData,
    });
  };

  return (
    <main>
      <Section>
        <Container>
          <Toaster />
          <Breadcrumbs
            items={[
              { title: "Animals", path: location.state?.from || "/animals" },
              { title: " Animal detile", path: `/animals/${id}` },
              { title: "Edit animal" },
            ]}
          />
          <div>
            <h1>Edit Animal Details</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must have minimum 2 character",
                  },
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <fieldset>
                <legend>Choose an animal </legend>
                <label>
                  Dog
                  <input
                    type="radio"
                    value="dog"
                    {...register("type", { required: "Select type of animal" })}
                  />
                </label>
                <label>
                  Cat
                  <input
                    type="radio"
                    value="cat"
                    {...register("type", { required: "Select gender" })}
                  />
                </label>
              </fieldset>
              {errors.type && <p>{errors.type.message}</p>}
            </div>
            <div>
              <fieldset>
                <legend>Choose a sex </legend>
                <label>
                  Male
                  <input
                    type="radio"
                    value="male"
                    {...register("sex", { required: "Sex type of animal" })}
                  />
                </label>
                <label>
                  Female
                  <input
                    type="radio"
                    value="female"
                    {...register("sex", { required: "Sex type of animal" })}
                  />
                </label>
              </fieldset>
              {errors.sex && <p>{errors.sex.message}</p>}
            </div>

            <div>
              <label htmlFor="breed">Breed:</label>
              <input
                type="text"
                id="breed"
                {...register("breed", {
                  required: "Breed is required",
                  minLength: {
                    value: 2,
                    message: "Breed must have minimum 2 character",
                  },
                })}
              />
            </div>
            <div>
              <p>Date of birth:</p>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select birth date"
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="dd.MM.yyyy"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={30}
                  />
                )}
              />

              {errors.birthDate && <p>{errors.birthDate.message}</p>}
            </div>

            <div>
              <label htmlFor="price">Price:</label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue);
                    }}
                    allowedDecimalSeparators={["."]}
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    allowLeadingZeros={false}
                    allowNegative={false}
                  />
                )}
              ></Controller>
              {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                style={{
                  resize: "none",
                  width: 300,
                  height: 100,
                }}
                id="description"
                {...register("description", {
                  maxLength: {
                    value: 1000,
                    message: "Too long description",
                  },
                })}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <Controller
              name="photo"
              control={control}
              render={({ field }) => {
                return (
                  <DropzoneField
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />
            <button disabled={mutation.isPending}>Send</button>
            <button
              type="button"
              onClick={() =>
                reset({
                  name: "",
                  type: "dog",
                  breed: "",
                  birthDate: undefined,
                  price: undefined,
                  description: "",
                  photo: [],
                })
              }
            >
              Reset
            </button>
          </form>
        </Container>
      </Section>
    </main>
  );
}
