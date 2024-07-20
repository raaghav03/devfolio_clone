"use client";
import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

type User = z.infer<typeof userSchema>;
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
interface UserList extends User {
  id: string
}
const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 characters" })
    .regex(passwordValidation, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export default function Home() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [userlist, setUserList] = useState<UserList[]>([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("/api/users");
        console.log(response.data);
        setUserList(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
    setErrors([]);
  };

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = userSchema.safeParse(user);
    if (!validation.success) {
      setErrors(validation.error.issues);
      return;
    }
    try {
      const response = await axios.post("/api/users", user);
      console.log(response);
      clearForm();
    } catch (err) {
      console.error("error adding user" + err);
    }
  };

  return (
    <>
      <form
        onSubmit={addUser}
        className="flex flex-col items-start m-4 p-4 gap-4"
      >
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        {errors.find((error) => error.path.includes("username")) && (
          <span className="text-red-500">
            {errors.find((error) => error.path.includes("username"))?.message}
          </span>
        )}

        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        {errors.find((error) => error.path.includes("email")) && (
          <span className="text-red-500">
            {errors.find((error) => error.path.includes("email"))?.message}
          </span>
        )}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        {errors.find((error) => error.path.includes("password")) && (
          <span className="text-red-500">
            {errors.find((error) => error.path.includes("password"))?.message}
          </span>
        )}

        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={user.firstName}
          onChange={handleChange}
        />
        {errors.find((error) => error.path.includes("firstName")) && (
          <span className="text-red-500">
            {errors.find((error) => error.path.includes("firstName"))?.message}
          </span>
        )}

        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={user.lastName}
          onChange={handleChange}
        />
        {errors.find((error) => error.path.includes("lastName")) && (
          <span className="text-red-500">
            {errors.find((error) => error.path.includes("lastName"))?.message}
          </span>
        )}

        <Button type="submit">Add User</Button>
      </form>
      {
        userlist.map((user) => (
          <div key={user.id}>
            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.firstName}</div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</div>
          </div>
        ))
      }
    </>
  );
}
