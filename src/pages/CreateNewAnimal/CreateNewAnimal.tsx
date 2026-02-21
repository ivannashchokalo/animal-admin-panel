import { Controller, useForm } from "react-hook-form";
import DropzoneField from "../../components/DropzoneField/DropzoneField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CreateNewAnimalForm {
  name: string;
  animal: "dog" | "cat";
  breed: string;
  birthDate: Date | null;
  price: number;
  description: string;
  photo: File[];
}

export default function CreateNewAnimal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateNewAnimalForm>({
    defaultValues: {
      photo: [],
    },
  });

  const onSubmit = (data: CreateNewAnimalForm) => {
    console.log(data);
    reset();
  };

  return (
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
          rules={{ required: "Birth date is required" }}
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
        <input
          type="number"
          id="price"
          {...register("price", {
            required: "Price is required",
            min: {
              value: 0,
              message: "Invalid price",
            },
            valueAsNumber: true,
            // validate: (price: number) => price >= 0 || "Invalid price",
          })}
        />
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
  );
}
