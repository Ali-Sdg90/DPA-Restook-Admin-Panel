import { ReactComponent as CardUserIcon } from "../assets/images/restaurants-page/User (2).svg";
import { ReactComponent as CardAlertIcon } from "../assets/images/restaurants-page/Alert.svg";
import { ReactComponent as CardCreditCardIcon } from "../assets/images/restaurants-page/Credit Card (3).svg";
import { ReactComponent as CardImageIcon } from "../assets/images/restaurants-page/Image - 3.svg";
import { ReactComponent as CardNoteIcon } from "../assets/images/restaurants-page/Note - Text (3).svg";
import { ReactComponent as CardTicketIcon } from "../assets/images/restaurants-page/Ticket.svg";

export const restaurantProfileCardsConstants = [
    {
        title: "اطلاعات مجموعه",
        icon: <CardUserIcon />,
        bgColor: "#EFF1FE",
        borderColor: "rgba(93, 106, 242, 0.50)",
    },
    {
        title: "آگهی‌ها",
        icon: <CardNoteIcon />,
        bgColor: "#EBF8EF",
        borderColor: "rgba(46, 184, 92, 0.20)",
    },
    {
        title: "گالری مجموعه",
        icon: <CardImageIcon />,
        bgColor: "#F5E9F8",
        borderColor: "#CB8FD9",
    },
    {
        title: "تراکنش ها و امور مالی",
        icon: <CardCreditCardIcon />,
        bgColor: "#E8F6FE",
        borderColor: "#7FCAF9",
    },
    {
        title: "کد تخفیف اختصاصی",
        icon: <CardTicketIcon />,
        bgColor: "#FDDFD3",
        borderColor: "#F9A07A",
    },
    {
        title: "گزارش‌های تخلف",
        icon: <CardAlertIcon />,
        bgColor: "#FDF4D3",
        borderColor: "#F9DD7A",
    },
];
