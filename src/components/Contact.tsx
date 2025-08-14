"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useEffect } from "react";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/hooks/use-toast";
import { useContactForm } from "@/context/ContactFormContext";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  package: z.string().min(1, "Package selection is required"),
  questions: z.string().optional(),
  honey: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { selectedPackage } = useContactForm();
  const { toast } = useToast();

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

  useEffect(() => {
    if (selectedPackage) form.setValue("package", selectedPackage);
  }, [selectedPackage, form]);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send message");
      return json;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description:
          "Thank you for your message! I will get back to you within 2 business days.",
        variant: "default",
        duration: 5000,
      });
      form.reset();
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => contactMutation.mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full px-4 py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email *</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="w-full px-4 py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Package */}
        <FormField
          control={form.control}
          name="package"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package/Service Choice *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full px-4 py-3">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["standard", "video", "alacarte"].map((pkg) => (
                    <SelectItem key={pkg} value={pkg}>
                      {pkg === "standard"
                        ? "Standard Package"
                        : pkg === "video"
                        ? "Video Package"
                        : "A la carte"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Questions */}
        <FormField
          control={form.control}
          name="questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Questions</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} placeholder="Your message..." />
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
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={contactMutation.isPending} className="w-full">
          {contactMutation.isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
