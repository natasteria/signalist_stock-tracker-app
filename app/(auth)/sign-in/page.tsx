"use client";

import {useForm} from "react-hook-form";
import InputField from "@/components/form/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/form/FooterLink";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
        },
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <h1 className="form-title">Welcome Back</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: "Full name is required",
                        minLength: { value: 2, message: "Full name must be at least 2 characters" },
                    }}
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    }}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="yellow-btn w-full mt-5"
                >
                    {isSubmitting ? "Signing iN" : "Sign in"}
                </Button>

                <FooterLink
                    text="Don't have an account?"
                    linkText="Create Account"
                    href="/sign-up"
                />
            </form>
        </>
    );
};

export default SignIn;
