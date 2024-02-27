interface ISlideshowContext {
    isSlideshow: boolean;
    toggleSlideshow: () => void;
}

interface LocationProps {
    country: CountryProps;
    state: StateProps;
}