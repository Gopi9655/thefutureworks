"use client";

import { useRef, useState, useCallback } from "react";
import type { ApiResult } from "@/lib/types";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface UseFormSubmit<T> {
  status: FormStatus;
  errors: Record<string, string>;
  serverError: string | null;
  submittedOnce: React.MutableRefObject<boolean>;
  submit: (values: T) => Promise<void>;
  clearError: (key: string) => void;
  reset: () => void;
}

/**
 * Validate-on-submit form controller.
 * - validate() returns a map of fieldId -> message (empty = valid)
 * - onSubmit() is the async API call; it returns an ApiResult
 * States: idle -> (error | submitting) -> (success | error)
 */
export function useFormSubmit<T>(
  validate: (values: T) => Record<string, string>,
  onSubmit: (values: T) => Promise<ApiResult>,
): UseFormSubmit<T> {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const submittedOnce = useRef(false);

  const submit = useCallback(async (values: T) => {
    submittedOnce.current = true;
    setServerError(null);
    const er = validate(values) || {};
    setErrors(er);
    if (Object.keys(er).length) {
      requestAnimationFrame(() => {
        const first = document.getElementById(Object.keys(er)[0]);
        first?.focus();
      });
      return;
    }
    setStatus("submitting");
    const res = await onSubmit(values);
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setServerError(res.message);
    }
  }, [validate, onSubmit]);

  const clearError = useCallback((k: string) => {
    setErrors((e) => {
      if (!e[k]) return e;
      const n = { ...e };
      delete n[k];
      return n;
    });
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setErrors({});
    setServerError(null);
    submittedOnce.current = false;
  }, []);

  return { status, errors, serverError, submittedOnce, submit, clearError, reset };
}
