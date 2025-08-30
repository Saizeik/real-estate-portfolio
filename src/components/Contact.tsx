"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useContactForm } from "@/context/ContactFormContext";
import { contactFormSchema, type ContactFormData } from "@/types/contact";
import { toast } from "sonner";

export default function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const { selectedPackage } = useContactForm();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      package: selectedPackage || "",
      questions: "",
      honey: "",
    },
  });

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (selectedPackage) form.setValue("package", selectedPackage);
  }, [selectedPackage, form]);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        if (json.errors && Array.isArray(json.errors)) {
          const messages = json.errors
            .map((err: any) => `${err.path.join(".")}: ${err.message}`)
            .join(", ");
          throw new Error(messages);
        }
        throw new Error(json.error || "Failed to send message");
      }
      return json;
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  if (!mounted) return null;

  const sharedInputClasses =
    "w-full px-3 sm:px-4 py-3 rounded-md outline-none bg-black text-white placeholder-gray-400 border border-gray-600 shadow-inner shadow-black/25 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300";

  return (
    <section id="contact" className="py-12 sm:py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-2xl border border-neutral-100">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 space-y-3 animate-fadeInUp">
            <h2 className="Rajdhani text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-800">
              Let's Work Together!
            </h2>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">
              Get in Touch
            </h3>
            <p className="text-neutral-600 font-semibold max-w-2xl mx-auto text-sm sm:text-base">
              If you don't hear from me within 2 business days after submitting
              your inquiry, feel free to contact me directly at:
            </p>
            <div className="mt-3 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <p className="text-neutral-600">
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href="tel:5202223943"
                  className="text-indigo-600 font-bold hover:underline"
                >
                  (520) 222-3943
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {["name", "email"].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as "name" | "email"}
                    render={({ field }) => (
                      <FormItem className="animate-fadeInUp">
                        <FormControl>
                          <Input
                            {...field}
                            type={fieldName === "email" ? "email" : "text"}
                            placeholder={fieldName === "name" ? "Your Name*" : "Your Email*"}
                            className={sharedInputClasses}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Package Select */}
              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem className="animate-fadeInUp">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={sharedInputClasses}>
                          <SelectValue placeholder="Select Package*" className="cursor-pointer" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white border border-gray-600 rounded-md shadow-inner shadow-black/25 z-50 mt-1 text-sm sm:text-base max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
                          {["standard", "video", "alacarte"].map((pkg) => (
                            <SelectItem
                              key={pkg}
                              value={pkg}
                              className={`px-3 sm:px-4 py-2 hover:bg-gray-800 text-white cursor-pointer flex items-center transition-transform duration-200 hover:scale-[1.02] ${
                                form.getValues("package") === pkg ? "font-semibold bg-gray-900" : ""
                              }`}
                            >
                              <span className="ml-4">
                                {pkg === "standard"
                                  ? "Standard Package"
                                  : pkg === "video"
                                  ? "Video Package"
                                  : "A la carte"}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                      *If A la carte please specify in the questions box.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Questions */}
              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem className="animate-fadeInUp">
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Questions or special requests"
                        className={sharedInputClasses + " resize-vertical"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Honeypot */}
              <FormField
                control={form.control}
                name="honey"
                render={({ field }) => (
                  <FormItem className="hidden" aria-hidden="true" tabIndex={-1}>
                    <FormControl>
                      <Input
                        {...field}
                        tabIndex={-1}
                        autoComplete="off"
                        spellCheck={false}
                        className="opacity-0 h-0 w-0 pointer-events-none absolute"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="animate-fadeInUp">
                <Button
                  type="submit"
                  disabled={contactMutation.status === "pending"}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-md transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 outline-none shadow-lg relative overflow-hidden cursor-pointer"
                >
                  {contactMutation.status === "pending" ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
