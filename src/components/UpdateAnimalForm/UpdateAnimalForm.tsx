import { Controller, useForm } from "react-hook-form";
import DropzoneField from "../../components/DropzoneField/DropzoneField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from "react-number-format";
import { useMutation } from "@tanstack/react-query";
import { updateAnimal } from "../../services/animalsService";
import toast, { Toaster } from "react-hot-toast";
import type { Animal } from "../../types/animal";

interface UpdateAnimalForm {
  name: string;
  animal: "dog" | "cat";
  breed: string;
  birthDate: Date | null;
  price: number;
  description: string;
  photo: File[];
}

interface UpdateAnimalFormProps {
  animal: Animal;
}

export default function UpdateAnimalForm({ animal }: UpdateAnimalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateAnimalForm>({
    defaultValues: {
      name: animal.name,
      animal: animal.type,
      breed: animal.breed,
      birthDate: animal.birthDate ? new Date(animal.birthDate) : null,
      price: animal.price,
      description: animal.description,
      photo: animal.images,
    },
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: updateAnimal,
    onMutate: () => toast.loading("Updating..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Updated");
      reset();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error");
    },
  });

  const onSubmit = (data: UpdateAnimalForm) => {
    mutation.mutate({
      id: animal.id,
      ...data,
    });
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 50 }}>
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
                {...register("animal", { required: "Select type of animal" })}
              />
            </label>
            <label>
              Cat
              <input
                type="radio"
                value="cat"
                {...register("animal", { required: "Select gender" })}
              />
            </label>
          </fieldset>
          {errors.animal && <p>{errors.animal.message}</p>}
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
                onChange={field.onChange}
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
                value: 200,
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
              <DropzoneField value={field.value} onChange={field.onChange} />
            );
          }}
        />
        <button>Send</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
    </>
  );
}
