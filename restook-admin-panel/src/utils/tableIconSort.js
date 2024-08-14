import { ReactComponent as Swap } from "../assets/images/home-page/swap-icon.svg";
import { ReactComponent as Up } from "../assets/images/home-page/up-arrow.svg";
import { ReactComponent as Down } from "../assets/images/home-page/down-arrow.svg";

export const sortIcon = (mode, sortMode) => {
    if (sortMode.mode === mode) {
        if (sortMode.isASC) {
            return <Up />;
        } else {
            return <Down />;
        }
    } else {
        return <Swap />;
    }
};
