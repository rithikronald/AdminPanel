import { useQuery } from "@tanstack/react-query";
import { adminInstance } from "api";
import { CreateReelsModal } from "components/custom/CreateReelsModal";
import { HRTable } from "components/custom/HRTable";
import { Page } from "components/shared/Page";
import { Button } from "components/ui";
import { useEffect, useState } from "react";

export default function Reels() {
  const [openModal, setOpenModal] = useState(false);
  const { data } = useQuery({
    queryKey: ["reels"],
    queryFn: () => adminInstance.get("reels/"),
  });

  useEffect(() => {
    console.log("Data", JSON.stringify(data?.data?.data));
  }, [data?.data]);

  return (
    <Page title="Reelspage">
      <div className="transition-content mb-4 w-full px-[--margin-x] pt-5 lg:pt-6">
        <div className="min-w-0">
          <div className="flex flex-row items-center justify-between">
            <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
              Reels Section
            </h2>
            <Button
              onClick={() => setOpenModal(true)}
              unstyled
              className="rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 px-5 py-2 text-white duration-100 ease-out [contain:paint] hover:opacity-[.85] focus:opacity-[.85] active:translate-y-px"
            >
              Add Reels
            </Button>
          </div>
          <CreateReelsModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
            <HRTable />
          </div>
        </div>
      </div>
    </Page>
  );
}
