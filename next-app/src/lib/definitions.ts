import type { ExternalToast } from "sonner";

export type UserDTO = {
  name: string | null;
  email: string;
};

export enum NotifType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export type NotifParams = {
  message: string;
  data: ExternalToast;
  type?: NotifType;
};

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      code?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
