import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { NAV_TYPE_ITEM, NAV_TYPE_ROOT } from "constants/app.constant";

const ROOT_DASHBOARDS = "/reels";

const path = (root, item) => `${root}${item}`;

export const reels = {
  id: "reels",
  type: NAV_TYPE_ROOT,
  path: "/reels",
  title: "Reels",
  transKey: "nav.reels.reels",
  Icon: VideoCameraIcon,
  childs: [
    {
      id: "reels.reels",
      path: path(ROOT_DASHBOARDS, "/reels"),
      type: NAV_TYPE_ITEM,
      title: "Reels",
      transKey: "nav.reels.reels",
      Icon: VideoCameraIcon,
    },
    {
      id: "reels.comments",
      path: path(ROOT_DASHBOARDS, "/comments"),
      type: NAV_TYPE_ITEM,
      title: "Comments",
      transKey: "nav.reels.comments",
      Icon: VideoCameraIcon,
    },
    {
      id: "reels.likes",
      path: path(ROOT_DASHBOARDS, "/likes"),
      type: NAV_TYPE_ITEM,
      title: "Likes",
      transKey: "nav.reels.likes",
      Icon: VideoCameraIcon,
    },
    {
      id: "reels.createReels",
      path: path(ROOT_DASHBOARDS, "/createReels"),
      type: NAV_TYPE_ITEM,
      title: "Create Reels",
      transKey: "nav.reels.createReels",
      Icon: VideoCameraIcon,
    },
  ],
};
