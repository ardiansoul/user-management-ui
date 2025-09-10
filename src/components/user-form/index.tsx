import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import UserService from "../../services/users";
import type User from "../../interface/user";
import useModal from "../../hooks/useModal";
import useAlert from "../../hooks/useAlert";

interface UserFormProps {
  data?: Pick<User, "id" | "name" | "email"> | null;
}

export default function UserForm({ data }: UserFormProps) {
  const queryClient = useQueryClient();
  const { handleModal } = useModal();
  const { handleAlert } = useAlert();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
  });

  const mutation = useMutation({
    mutationKey: ["user", data?.id ? "edit" : "add"],
    mutationFn: data?.id
      ? () => UserService.updateUser(data.id!, formData)
      : () => UserService.createUser(formData),
    onSuccess: () => {
      queryClient.invalidateQueries();
      handleModal(false);
      handleAlert(
        "success",
        `User ${data?.id ? "updated" : "created"} successfully`
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name === "") {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    }

    if (formData.email === "") {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    }

    if (Object.keys(errors).length > 0) {
      return;
    }
    mutation.mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        name="name"
        value={formData.name}
        error={!!errors.name}
        onChange={handleChange}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        name="email"
        value={formData.email}
        error={!!errors.email}
        onChange={handleChange}
        helperText={errors.email}
      />
      <Box display={"flex"} justifyContent={"flex-end"} marginTop={2}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
