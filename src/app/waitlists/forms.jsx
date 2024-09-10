'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define the schema for validation
const formSchema = z.object({
  id: z.string().min(1, {
    message: 'ID is required.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
});

export default function WaitlistForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      email: '',
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/waitlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success
        alert('Waitlist entry added successfully!');
        reset(); // Reset form fields after success
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Submission failed'}`);
      }
    } catch (err) {
      alert(`Network Error: ${err.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter ID" {...field} />
              </FormControl>
              <FormMessage>{errors.id?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          Add Waitlist
        </Button>
      </form>
    </Form>
  );
}
