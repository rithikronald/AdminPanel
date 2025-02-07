// Import Dependencies
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

// Local Imports
import { useMutation } from "@tanstack/react-query";
import { adminInstance } from "api";
import { FileItem } from "components/shared/form/FileItem";
import { Button, Input, Radio, Textarea, Upload } from "components/ui";
import { useListState } from "hooks";

export function CreateReelsModal({ isOpen, onClose }) {
  const [files, { remove, append }] = useListState();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("status", data.status);

      if (data.video && data.video.length > 0) {
        const videoFile = data.video[0]; // Assuming single file
        formData.append("video", videoFile);
      }
      console.log("Form Data", formData);
      return adminInstance.post("reels/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (val) => {
      console.log("response", val);
      onClose();
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      append(...acceptedFiles);
      setValue("video", acceptedFiles); // Manually set the value
      trigger("video"); // Trigger validation
    },
    accept: {
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/ogg": [".ogg"],
    },
  });

  const formOption = {
    title: { required: "Title is required" },
    description: { required: "Description is required" },
    video: {
      required: "Video file is required",
      validate: (files) => {
        if (!files || files.length === 0) {
          return "Video file is required";
        }
        const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (!allowedTypes.includes(files[0].type)) {
          return "Only MP4, WebM, and OGG formats are allowed";
        }
        if (files[0].size > 50 * 1024 * 1024) {
          return "File size should not exceed 50MB";
        }
        return true;
      },
    },
    status: {
      required: "Please select a status",
      validate: (value) => {
        if (!["Active", "InActive"].includes(value)) {
          return "Invalid status selection";
        }
        return true;
      },
    },
  };

  const onSubmit = (data) => {
    console.log(mutation.isPending);
    console.log("DAta", JSON.stringify(data));
    mutation.mutate({
      title: data.title,
      description: data.description,
      video: data.video,
      status: data.status,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40" />
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel className="scrollbar-sm relative flex w-[40%] max-w-md flex-col overflow-y-auto rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-dark-700 sm:px-5">
            <div className="flex flex-1 flex-col">
              <p className="text-2xl font-semibold">Create New Reels</p>
              <div className="max-w-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    placeholder="Enter title"
                    classNames={{ root: "mt-4" }}
                    {...register("title", formOption.title)}
                    error={errors?.title && errors.title.message}
                  />
                  <Textarea
                    placeholder="Enter description"
                    classNames={{ root: "mt-4" }}
                    type="number"
                    {...register("description", formOption.description)}
                    error={errors?.description && errors.description.message}
                  />
                  <div>
                    <Upload
                      inputProps={{ ...getInputProps() }}
                      {...getRootProps()}
                    >
                      {({ ...props }) => (
                        <Button
                          {...props}
                          unstyled
                          className={clsx(
                            "mt-3 w-full shrink-0 flex-col rounded-lg border-2 border-dashed py-10",
                            isDragActive
                              ? "border-primary-600 dark:border-primary-500"
                              : "border-gray-300 dark:border-dark-450",
                          )}
                        >
                          <CloudArrowUpIcon className="size-12" />
                          <span
                            className={clsx(
                              "pointer-events-none mt-2",
                              isDragActive
                                ? "text-primary-600 dark:text-primary-400"
                                : "text-gray-600 dark:text-dark-200",
                            )}
                          >
                            <span className="text-primary-600 dark:text-primary-400">
                              Browse
                            </span>
                            <span> or drop your video files here</span>
                          </span>
                        </Button>
                      )}
                    </Upload>
                    {errors.video && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.video.message}
                      </p>
                    )}
                    <div className="mt-4 flex flex-col space-y-4">
                      {files.map((file, index) => (
                        <FileItem
                          handleRemove={() => remove(index)}
                          file={file}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    <p className="text-black">Status:</p>
                    <Radio
                      label="Active"
                      name="basic"
                      {...register("status", {
                        required: "Please select a status",
                      })}
                      value="active"
                    />
                    <Radio
                      label="InActive"
                      name="basic"
                      {...register("status", {
                        required: "Please select a status",
                      })}
                      value="inactive"
                    />
                  </div>
                  {errors.status && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.status.message}
                    </p>
                  )}
                  <Button className="mt-4" color="primary" type="submit">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
