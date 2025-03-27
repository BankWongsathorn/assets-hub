import { Home, User, Package, Clipboard, Settings } from "lucide-react";

export default [
  // Home
  {
    title: "Home",
    url: "/",
    icon: Home,
    dept: [
      "Admin",
      "Human resource",
      "Account",
      "Information Technology",
      "General",
    ],
  },
  // Human resource
  {
    title: "User",
    url: "/user",
    icon: User,
    dept: ["Admin", "Human resource"],
  },
  // Information Technology
  {
    title: "Warehouse",
    icon: Package,
    dept: [
      "Admin",
      "Human resource",
      "Account",
      "Information Technology",
      "General",
    ],
    sub: [
      {
        title: "Asset",
        url: "/warehouse/asset",
        dept: ["Admin", "Information Technology"],
      },
      {
        title: "Inventory",
        url: "/warehouse/inventory",
        dept: [
          "Admin",
          "Human resource",
          "Account",
          "Information Technology",
          "General",
        ],
      },
      {
        title: "Management",
        url: "/warehouse/management",
        dept: ["Admin", "Information Technology"],
      },
      {
        title: "Request",
        url: "/warehouse/request",
        dept: ["Admin", "Human resource"],
      },
    ],
  },
  // Account
  {
    title: "History",
    url: "/history",
    icon: Clipboard,
    dept: ["Admin", "Account"],
  },
  // Setting
  // {
  //   title: "Setting",
  //   url: "/setting",
  //   icon: Settings,
  //   dept: ["Admin"],
  // },
];
