import { useActionState } from "react";
import { useNotifyClient } from "./useNotifyClient";

export const useActionWithNotify = <State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>
) => {
  const [state, formAction, pending] = useActionState(action, initialState);

  const notify = useNotifyClient();

  return { state, action: formAction, pending, notify };
};
