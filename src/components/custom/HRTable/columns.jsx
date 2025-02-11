// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";
import { CopyableCell } from "components/shared/table/CopyableCell";

// Local Imports
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
import {
  DepartmentCell,
  IdCell,
  NameCell,
  PositionCell,
  StatusCell,
} from "./rows";
import { RowActions } from "./RowActions";
import { HighlightableCell } from "components/shared/table/HighlightableCell";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  // columnHelper.display({
  //   id: "select",
  //   header: SelectHeader,
  //   cell: SelectCell,
  // }),
  columnHelper.accessor((row) => row.id, {
    id: "id",
    header: () => <span className="-mx-2">ID</span>,
    cell: (props) => <span className="text-gray-500">{props.getValue()}</span>,
  }),
  columnHelper.accessor((row) => row.title, {
    id: "title",
    header: "Title",
    cell: (props) => <span className="font-medium">{props.getValue()}</span>,
  }),
  columnHelper.accessor((row) => row.description, {
    id: "description",
    header: "Description",
    cell: (props) => <span className="text-gray-600">{props.getValue()}</span>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: "Status",
    cell: (props) => (
      <span
        className={`rounded px-2 py-1 text-xs ${
          props.getValue() === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {props.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor((row) => row.video, {
    id: "video",
    header: "Video",
    cell: (props) => (
      <video width="100" height="100" controls>
        <source src={props.getValue()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ),
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: "created_at",
    header: "Created At",
    cell: (props) => new Date(props.getValue()).toLocaleString(),
  }),
  columnHelper.accessor((row) => row.updated_at, {
    id: "updated_at",
    header: "Updated At",
    cell: (props) => new Date(props.getValue()).toLocaleString(),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: RowActions,
  }),
];

// export const columns = [
//   columnHelper.display({
//     id: "select",
//     header: SelectHeader,
//     cell: SelectCell,
//   }),
//   columnHelper.accessor((row) => row.user_id, {
//     id: "user_id",
//     header: () => <span className="-mx-2">ID</span>,
//     cell: IdCell,
//   }),
//   columnHelper.accessor((row) => row.name, {
//     id: "name",
//     header: "Name",
//     cell: NameCell,
//   }),
//   columnHelper.accessor((row) => row.position, {
//     id: "position",
//     header: "Position",
//     cell: PositionCell,
//   }),
//   columnHelper.accessor((row) => row.level, {
//     id: "level",
//     header: "Level",
//     cell: HighlightableCell,
//   }),
//   columnHelper.accessor((row) => row.status.title, {
//     id: "status",
//     header: "Status",
//     cell: StatusCell,
//   }),
//   columnHelper.accessor((row) => row.department, {
//     id: "department",
//     header: "Department",
//     cell: DepartmentCell,
//   }),
//   columnHelper.accessor((row) => row.email, {
//     id: "email",
//     header: "Email",
//     cell: (props) => <CopyableCell {...props} highlight />,
//   }),
//   columnHelper.display({
//     id: "actions",
//     header: "",
//     cell: RowActions,
//   }),
// ];
