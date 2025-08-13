
"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  package: z.string().min(1, "Package selection is required"),
  questions: z.string().optional(),
  // honeypot field must be empty:
  honey: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      package: "",
      questions: "",
      honey: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I will get back to you within 2 business days.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-800 mb-4">
              Let's Work Together!
            </h2>
            <h3 className="text-xl font-medium text-neutral-800 mb-6">Get in Touch</h3>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              If you don't hear from me within 2 business days after submitting your inquiry, feel free to contact me directly at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-neutral-600">
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:skayes44@gmail.com" className="text-neutral-800 hover:underline">
                  skayes44@gmail.com
                </a>
              </p>
              <p className="text-neutral-600">
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:5202223943" className="text-neutral-800 hover:underline">
                  (520) 222-3943
                </a>
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Your Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-neutral-800 focus:border-transparent outline-none transition-colors"
                          data-testid="input-name"
                        />
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
                      <FormLabel className="text-black">
                        Your Email address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-neutral-800 focus:border-transparent outline-none transition-colors"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormField
                  control={form.control}
                  name="package"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-black">
                        Package/Service Choice <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger
                            className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-neutral-800 focus:border-transparent outline-none transition-colors"
                            data-testid="select-package"
                          >
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                
                        {/* Updated content with styles */}
                        <SelectContent 
                          className="bg-white border border-neutral-300 rounded-sm shadow-lg z-50 mt-1"
                        >
                          <SelectItem 
                            value="standard" 
                            className="px-4 py-2 hover:bg-neutral-100 text-black cursor-pointer"
                          >
                            Standard Package
                          </SelectItem>
                          <SelectItem 
                            value="video" 
                            className="px-4 py-2 hover:bg-neutral-100 text-black cursor-pointer"
                          >
                            Video Package
                          </SelectItem>
                          <SelectItem 
                            value="alacarte" 
                            className="px-4 py-2 hover:bg-neutral-100 text-black cursor-pointer"
                          >
                            A la carte
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-neutral-500 mt-1">
                        *If A la carte please specify in the questions box.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                )}
              />

              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Questions</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Tell me about your property, specific requirements, timeline, or any questions you have..."
                        className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-neutral-800 focus:border-transparent outline-none transition-colors resize-vertical"
                        data-testid="textarea-questions"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Honeypot field: hidden from users */}
              <FormField
                control={form.control}
                name="honey"
                render={({ field }) => (
                  <FormItem className="hidden" aria-hidden="true" tabIndex={-1}>
                    <FormLabel>Leave this field empty</FormLabel>
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

              <div>
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full px-8 py-4 bg-neutral-800 text-white font-medium rounded-sm hover:bg-neutral-700 transition-colors focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2 outline-none"
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
