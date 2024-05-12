import Swal from "sweetalert2";

export const AlertError = (text: string) => {
  Swal.fire({
    toast: true,
    title: "Opps!",
    text,
    icon: "error",
    position: "top-end",
    color: "white",
    background: "#262626",
    showConfirmButton: false,
    timerProgressBar: true,
    backdrop: true,
    timer: 5000,
    customClass: {
      timerProgressBar: "custom-timer-progress-bar",
    },
  });
};
