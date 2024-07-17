"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type UserErrors = Partial<Record<keyof User, string>>;

export default function Home() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<UserErrors>({});

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
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: UserErrors = {};
    if (user.username.length < 3) newErrors.username = "Username must be at least 3 characters long";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) newErrors.email = "Invalid email format";
    if (user.password.length < 8) newErrors.password = "Password must be at least 8 characters long";
    if (user.firstName.length === 0) newErrors.firstName = "First name is required";
    if (user.lastName.length === 0) newErrors.lastName = "Last name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error("Failed to add user");
        }
        const data = await response.json();
        console.log(data);
        clearForm();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <form onSubmit={addUser} className="flex flex-col items-start m-4 p-4 gap-4">
      {(Object.keys(user) as Array<keyof User>).map((key) => (
        <div key={key}>
          <Input
            type={key === "password" ? "password" : key === "email" ? "email" : "text"}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={user[key]}
            onChange={handleChange}
          />
          {errors[key] && (
            <p className="text-red-500 text-sm">{errors[key]}</p>
          )}
        </div>
      ))}
      <Button type="submit">Add User</Button>
    </form>
  );
}