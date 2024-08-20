import { ReactComponent as AlertOctagon } from "../assets/images/sider/Alert - Octagon (1).svg";
import { ReactComponent as ChefsHat } from "../assets/images/sider/chef's hat.svg";
import { ReactComponent as CommentText } from "../assets/images/sider/Comment - Text (2).svg";
import { ReactComponent as CreditCard } from "../assets/images/sider/Credit Card (2).svg";
import { ReactComponent as Cutlery } from "../assets/images/sider/cutlery 2.svg";
import { ReactComponent as Home } from "../assets/images/sider/Home.svg";
import { ReactComponent as NoteText } from "../assets/images/sider/Note - Text (1).svg";
import { ReactComponent as Smartphone } from "../assets/images/sider/Smartphone (1).svg";
import { ReactComponent as Tag } from "../assets/images/sider/Tag - 2 (2).svg";
import { ReactComponent as UserEdit } from "../assets/images/sider/User - Edit (1).svg";
import { ReactComponent as Users } from "../assets/images/sider/Users (1).svg";

export const SIDER_ITEMS = [
    {
        key: "1",
        label: "صفحه اصلی",
        icon: <Home />,
        nav: "/home-page",
        place: "home-page",
    },
    {
        key: "2",
        label: "لیست مجموعه‌ها",
        icon: <Cutlery />,
        nav: "/restaurants-list",
        place: "restaurants-list",
    },
    { key: "3", label: "لیست کارجو‌ها", icon: <NoteText /> },
    { key: "4", label: "لیست آگهی‌ها", icon: <ChefsHat /> },
    { type: "divider" },
    {
        key: "5",
        label: "مجموعه‌های جدید",
        icon: <UserEdit />,
        nav: "/home-page",
        place: "new-restaurants",
    },
    {
        key: "6",
        label: "آگهی‌های جدید",
        icon: <CreditCard />,
        nav: "/home-page",
        place: "new-advertisements",
    },
    {
        key: "7",
        label: "کارجويان جدید",
        icon: <AlertOctagon />,
        nav: "/home-page",
        place: "new-users",
    },
    { key: "8", label: "پیگیری تراکنش های مالی", icon: <AlertOctagon /> },
    { key: "9", label: "نظرات ثبت شده", icon: <CommentText /> },
    { type: "divider" },
    { key: "10", label: "مدیریت ادمین‌ها", icon: <Users /> },
    { key: "11", label: "سطوح دسترسی", icon: <Tag /> },
    { key: "12", label: "تنظیمات", icon: <Smartphone /> },
];
