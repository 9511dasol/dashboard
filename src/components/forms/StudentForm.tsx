"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// https://react-hook-form.com/get-started

import { Schema, z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { Student as pupil } from "@/lib/data";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  studentId: z
    .number()
    .min(7, { message: "studentId must be at least 10 number!" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  bloodType: z.string().min(1, { message: "BloodType is required" }),
  birthday: z.string().min(1, { message: "Birthday is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

type Students = {
  type: "create" | "update" | "delete";
  data: any;
};

function StudentForm({ type, data }: Students) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const name: string[] = type === "update" ? data.name.split(" ") : ["", ""];
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? <>Create a new Student</> : <>Update Student</>}
      </h1>
      <span className="text-sm to-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap items-center gap-4">
        <InputField
          lable="Username"
          name="username"
          type="text"
          defaultValue={data?.name}
          register={register}
          error={errors.username}
        />
        <InputField
          lable="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          lable="studentId"
          name="studentId"
          type="text"
          defaultValue={data?.studentId}
          register={register}
          error={errors.studentId}
        />
      </div>
      <span className="text-sm to-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap items-center gap-4">
        <InputField
          lable="First Name"
          name="firstName"
          defaultValue={name[0]}
          register={register}
          error={errors.firstName}
        />
        <InputField
          lable="Last Name"
          name="lastName"
          defaultValue={name[1]}
          register={register}
          error={errors.lastName}
        />
        <InputField
          lable="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          lable="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          lable="BloodType"
          name="bloodType"
          defaultValue={data?.bloodType ? "a" : "o"}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          lable="Birthday"
          name="birthday"
          type="date"
          defaultValue={data?.dateOfBirth}
          register={register}
          error={errors.birthday}
        />
        <div className="text-xs text-gray-500 gap-2 md:w-1/4">
          <label htmlFor="sex" className="text-xs text-gray-600">
            Sex
          </label>
          <select
            id="sex"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-sm text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full text-xs text-gray-500 md:w-1/4 justify-center">
          <label
            htmlFor="img"
            className="text-xs text-gray-600 flex items-center gap-2 cursor-pointer"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-sm text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 to-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default StudentForm;
