export const createCssMountPoint = () => {
  const styleSheet = document.createElement("style");
  styleSheet.title = "artizan";

  document.head.appendChild(styleSheet).sheet;
};
