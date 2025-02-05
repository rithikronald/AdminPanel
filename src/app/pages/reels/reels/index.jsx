import { HRTable } from "components/custom/HRTable";
import { Page } from "components/shared/Page";

export default function Reels() {
  return (
    <Page title="Reelspage">
      <div className="transition-content w-full px-[--margin-x] pt-5 lg:pt-6 mb-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
            REELS Page
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
            <HRTable />
          </div>
        </div>
      </div>
    </Page>
  );
}
