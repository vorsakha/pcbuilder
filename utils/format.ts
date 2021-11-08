export const handleTitle = (title: string, light?: boolean) => {
  let titleString;

  if (light && window.matchMedia("(max-width: 488px)").matches) {
    return "";
  }
  if (window.matchMedia("(min-width: 830px)").matches) {
    return title;
  }
  if (window.matchMedia("(max-width: 829px)").matches) {
    titleString = `${title.substr(0, 90)}...`;
  }
  if (window.matchMedia("(max-width: 717px)").matches) {
    titleString = `${title.substr(0, 40)}...`;
  }
  if (window.matchMedia("(max-width: 488px)").matches) {
    titleString = `${title.substr(0, 18)}...`;
  }

  if (titleString) {
    return titleString;
  } else {
    return title;
  }
};
