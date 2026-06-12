import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { InputForm } from "@components/Authentication/InputForm/InputForm";
import CloseIcon from "@assets/icons/close.svg?react";
import validation from "@validators/auth.schema";
import styles from "./ChangePasswordModal.module.css";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
    isPending?: boolean;
    error?: string | null;
}

export default function ChangePasswordModal({
    isOpen,
    onClose,
    onSubmit,
    isPending = false,
    error = null,
}: ChangePasswordModalProps) {
    const { t } = useTranslation();
    const currentPasswordRef = useRef<HTMLInputElement>(null);

    // Form fields state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Validation errors state
    const [errors, setErrors] = useState<{
        current_password?: string;
        password?: string;
        password_confirmation?: string;
    }>({});

    const [isTouched, setIsTouched] = useState<{
        current_password?: boolean;
        password?: boolean;
        password_confirmation?: boolean;
    }>({});

    // Reset state on open/close
    useEffect(() => {
        if (isOpen) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setErrors({});
            setIsTouched({});
            setTimeout(() => {
                const firstInput = document.getElementById("current_password") as HTMLInputElement;
                firstInput?.focus();
            }, 50);
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Reusable validation schema leveraging existing auth password rules
    const changePasswordSchema = z.object({
        current_password: z.string().min(1, {
            message: t("validation.required", "This field is required"),
        }),
        password: validation.fields.password,
        password_confirmation: z.string(),
    }).refine((data) => data.password === data.password_confirmation, {
        message: t("passwords_do_not_match", "Passwords do not match"),
        path: ["password_confirmation"],
    });

    // Validate form on field updates
    useEffect(() => {
        if (!isOpen) return;

        const result = changePasswordSchema.safeParse({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
        });

        if (result.success) {
            setErrors({});
        } else {
            const formattedErrors: typeof errors = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof typeof errors;
                if (!formattedErrors[path]) {
                    formattedErrors[path] = issue.message;
                }
            });
            setErrors(formattedErrors);
        }
    }, [currentPassword, newPassword, confirmPassword, isOpen]);

    if (!isOpen) return null;

    // Strength Meter logic based on complexity rules
    const getPasswordStrength = (pass: string) => {
        if (!pass) return { score: 0, label: "", color: "" };
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
        if (/\d/.test(pass)) score++;
        if (/[\W_]/.test(pass)) score++;

        if (score <= 2) {
            return { score, label: t("strength_weak", "Weak"), color: "#ef4444" };
        } else if (score === 3) {
            return { score, label: t("strength_medium", "Medium"), color: "#f97316" };
        } else {
            return { score, label: t("strength_strong", "Strong"), color: "#22c55e" };
        }
    };

    const strength = getPasswordStrength(newPassword);
    const isValid = Object.keys(errors).length === 0 && currentPassword && newPassword && confirmPassword;

    const handleBlur = (field: keyof typeof isTouched) => {
        setIsTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || isPending) return;
        onSubmit?.({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
        });
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className={styles.overlay}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
        >
            <div className={styles.dialog}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h2 id="change-password-title" className={`${styles.title} h5`}>
                            {t("change_password", "Change Password")}
                        </h2>
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label={t("close", "Close")}
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.body}>
                        {error && (
                            <div className={styles.errorMessage} role="alert">
                                {error}
                            </div>
                        )}

                        {/* Current Password */}
                        <div onBlur={() => handleBlur("current_password")}>
                            <InputForm
                                id="current_password"
                                label={t("current_password", "Current Password")}
                                type="password"
                                placeholder={t("enter_current_password", "Enter current password")}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                errors={isTouched.current_password ? errors.current_password : undefined}
                            />
                        </div>

                        {/* New Password */}
                        <div onBlur={() => handleBlur("password")}>
                            <InputForm
                                id="password"
                                label={t("new_password", "New Password")}
                                type="password"
                                placeholder={t("enter_new_password", "Enter new password")}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                errors={isTouched.password ? errors.password : undefined}
                            />
                        </div>

                        {/* Password Strength Indicator */}
                        {newPassword && (
                            <div className={styles.strengthContainer}>
                                <div className={styles.strengthHeader}>
                                    <span className="bodyTextSm">{t("password_strength", "Password strength")}:</span>
                                    <span
                                        className={styles.strengthLabel}
                                        style={{ color: strength.color }}
                                    >
                                        {strength.label}
                                    </span>
                                </div>
                                <div className={styles.strengthBars}>
                                    <div
                                        className={`${styles.strengthBar} ${strength.score >= 1 ? styles.active : ""}`}
                                        style={{ backgroundColor: strength.score >= 1 ? strength.color : undefined }}
                                    />
                                    <div
                                        className={`${styles.strengthBar} ${strength.score >= 3 ? styles.active : ""}`}
                                        style={{ backgroundColor: strength.score >= 3 ? strength.color : undefined }}
                                    />
                                    <div
                                        className={`${styles.strengthBar} ${strength.score >= 4 ? styles.active : ""}`}
                                        style={{ backgroundColor: strength.score >= 4 ? strength.color : undefined }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Confirm Password */}
                        <div onBlur={() => handleBlur("password_confirmation")}>
                            <InputForm
                                id="password_confirmation"
                                label={t("confirm_new_password", "Confirm New Password")}
                                type="password"
                                placeholder={t("confirm_new_password_placeholder", "Confirm new password")}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                errors={isTouched.password_confirmation ? errors.password_confirmation : undefined}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={styles.footer}>
                        <button
                            type="button"
                            className={`${styles.cancelBtn} bodyTextSm`}
                            onClick={onClose}
                            disabled={isPending}
                        >
                            {t("cancel", "Cancel")}
                        </button>
                        <button
                            type="submit"
                            className={`btn btnPrimary ${styles.submitBtn} bodyTextSm`}
                            disabled={!isValid || isPending}
                            aria-disabled={!isValid || isPending}
                        >
                            {isPending ? (
                                <span className={styles.spinner} />
                            ) : (
                                <span>{t("change_password", "Change Password")}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
