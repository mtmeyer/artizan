export const createCssMountPoint = () => {
  const styleSheet = document.createElement("style");
  styleSheet.title = "cssInJs";
  document.head.appendChild(styleSheet).sheet;
};
