import { NotifParams, NotifType } from "@/lib/definitions";
import React from "react";
import { toast } from "sonner";

const errorColors = {
  [NotifType.ERROR]: "crimson",
  [NotifType.SUCCESS]: "green",
  [NotifType.INFO]: "blue",
  [NotifType.WARNING]: "orange",
};

export const useNotifyClient = () => {
  return React.useCallback((params: NotifParams) => {
    const {
      message,
      type,
      data: { action, description, ...rest },
    } = params;

    return toast(message || "Event has been created", {
      description: description || "Event has been created",
      style: {
        background: errorColors[type || "info"],
        fontSize: "1rem",
      },
      action,
      ...rest,
    });
  }, []);
};
