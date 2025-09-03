"use client";
import { useRegisterMutation } from "@/store/services/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z.string().url().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const [registerMutation] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    const res = await registerMutation(values).unwrap();
    if ("success" in res && res.success) {
      dispatch(setCredentials(res.data));
      toast.success("Registered");
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Create Account</h1>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register("name")}
          className="w-full border rounded-xl px-3 py-2"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
        <input
          placeholder="Email"
          {...register("email")}
          className="w-full border rounded-xl px-3 py-2"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
          className="w-full border rounded-xl px-3 py-2"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
        <input
          placeholder="Photo URL (optional)"
          {...register("photo")}
          className="w-full border rounded-xl px-3 py-2"
        />
        <button className="w-full bg-black text-white rounded-xl py-2">
          Register
        </button>
      </form>
    </div>
  );
}
