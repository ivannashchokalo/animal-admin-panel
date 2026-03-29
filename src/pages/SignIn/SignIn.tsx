import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import type { AuthData } from "../../types/user";
import { useForm } from "react-hook-form";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import { useLoginMutation } from "../../services/auth";

export default function SignIn() {
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: AuthData) => {
    try {
      const email = data.username.trim();
      const password = data.password;

      const result = await login({
        username: email,
        password: password,
      }).unwrap(); //перетворює результат RTK Query у нормальний Promise

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <>
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
            <button type="submit" disabled={isLoading}>
              Login
            </button>
          </form>
        </Container>
      </Section>
    </>
  );
}
