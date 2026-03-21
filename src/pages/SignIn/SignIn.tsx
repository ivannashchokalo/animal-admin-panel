import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import type { AuthData } from "../../types/user";
import { useForm } from "react-hook-form";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

export default function SignIn() {
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: AuthData) => {
    const email = data.username.trim();
    const password = data.password;
    console.log(password);

    mutation.mutate({
      username: email,
      password: password,
    });
  };

  return (
    <main>
      {" "}
      <Toaster />
      <Section>
        <Container>
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...registerField("username", {
                required: "User name is required",
              })}
              placeholder="User name"
            />
            {errors.username && <p>{errors.username.message}</p>}
            <input
              {...registerField("password", {
                required: "Password is required",
              })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit" disabled={mutation.isPending}>
              Login
            </button>
          </form>
        </Container>
      </Section>
    </main>
  );
}
