"use client"
import { toast } from "sonner";

export default function showMessage(message: string, isSuccess: boolean) {
  if (isSuccess) {
    toast.success(message, {
      className: "toast-success",
    });
  } else {
    toast.error(message, {
      className: "toast-error",
    });
  }
}
