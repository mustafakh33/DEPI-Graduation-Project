import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/utils/validations/auth.validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
// import { loginThunk } from "../store/authSlice";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Example: dispatch(loginThunk(data));
    console.log("Form Submitted:", data);
    
    // Fake delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-label-md block" htmlFor="email">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          {...register("email")}
          className={errors.email ? "border-danger focus-visible:ring-danger" : ""}
        />
        {errors.email && (
          <p className="text-sm text-danger mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-label-md block" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className={errors.password ? "border-danger focus-visible:ring-danger" : ""}
        />
        {errors.password && (
          <p className="text-sm text-danger mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="rememberMe"
          {...register("rememberMe")}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <label htmlFor="rememberMe" className="text-body-sm cursor-pointer select-none">
          Remember me
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};
