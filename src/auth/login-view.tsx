// import React from 'react'
import { Form, FormField, FormControl, FormLabel, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link ,useNavigate} from "react-router";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function LoginPage() {
  const navgation=useNavigate()
  const formScheam = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  type LoginForm = z.infer<typeof formScheam>;

  interface LoginResponse {
    token: string;
    user?: {
      id: string;
      email: string;
    };
  }
  const form = useForm<LoginForm>({
    resolver: zodResolver(formScheam),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // api call
  const handleLogin = async (values: LoginForm) => {
    try {
      const res = await axios.post<LoginResponse>(
         `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/login`,
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status == 200) {
        toast.success("Login sucessfull");
        localStorage.setItem("token", res.data.token);
        navgation("/dashbord")
      }
    } catch (error: any) {
      const errormsg = error.response?.data?.message || "Login Failed !";
      toast.error(errormsg);
     
    }
  };
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md    p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="second@gamil.com" {...field} />
                  </FormControl>
                </FormItem>
              )}></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}></FormField>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  Loging in <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
