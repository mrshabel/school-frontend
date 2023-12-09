"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, set } from "date-fns";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { studentFormSchema } from "@/lib/validations";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonLoading } from "@/components/button-loading";

const studentClass = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const defaultValues = {
  name: "",
  class: "",
  address: "",
  gender: "",
  dob: "",
  displayImage: "",
  parentName: "",
  parentEmail: "",
  parentOccupation: "",
  parentGender: "",
  phone: "",
};

export default defaultValues;

export function CreateForm() {
  const formData = new FormData();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data) {
    setIsLoading(true);
    // Add all form fields except the image
    for (const key in data) {
      if (key !== "displayImage" && key !== "class") {
        formData.append(key, data[key]);
      }
    }

    // Add the image file
    formData.append("class", "656a543630fa161d2888aab0");
    formData.append("displayImage", data.displayImage[0]);
    try {
      const res = await fetch(
        `https://school-backend-kappa.vercel.app/api/students`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhODE2ZDI3OTVlNjU5YmM2NmJjYzQiLCJpYXQiOjE3MDE5NTQzNDIsImV4cCI6MTcwMjA0MDc0Mn0.ItX8EEOyYndh90u5RcuG7-UuFKqVAptKZta_HByl96I",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      router.refresh();
      router.push("/admin/students");
      toast({ description: "Student details added" });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message || "There was a problem with your request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 align-middle gap-5 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Student name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Class</SelectLabel>
                      {studentClass.map((item, index) => (
                        <SelectItem value={item} key={index}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Student address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Photo</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-4" />

        <h3 className="text-lg">Parent Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 align-center gap-8 mb-3">
          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentOccupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Occupation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentGender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+233 ... " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <ButtonLoading />
        ) : (
          <Button type="submit" className="w-fit px-4">
            Add Student
          </Button>
        )}
      </form>
    </Form>
  );
}
