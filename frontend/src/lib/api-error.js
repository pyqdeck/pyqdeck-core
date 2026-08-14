const PERMISSION_DENIED_MESSAGE =
  'You do not have permission to do this. Ask an admin to grant you access.';

/**
 * Axios's own `error.message` for a failed request is just
 * "Request failed with status code 403" -- not something to show a user.
 * Prefer the backend's message; for 403s, fall back to a message that
 * actually explains what happened instead of a generic retry prompt.
 */
export function getErrorMessage(
  error,
  fallback = 'Something went wrong. Please try again.'
) {
  const backendMessage = error?.response?.data?.message;

  if (error?.response?.status === 403) {
    return backendMessage || PERMISSION_DENIED_MESSAGE;
  }

  return backendMessage || fallback;
}
