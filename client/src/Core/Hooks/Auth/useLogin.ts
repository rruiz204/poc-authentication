import { ref } from "vue";
import { AuthService } from "@Services/Auth/AuthService";
import type { LoginPayload } from "@Services/Auth/AuthPayload";

export const useLogin = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const invoke = async (payload: LoginPayload) => {
    error.value = null;
    loading.value = true;

    const response = await AuthService.login(payload);

    if (response.error) {
      error.value = response.error.message;
    } else if (response.data) {
      AuthService.storeToken(response.data);
    };

    loading.value = false;
  };

  return { invoke, error, loading };
};