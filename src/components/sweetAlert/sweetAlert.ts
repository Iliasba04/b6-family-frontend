import Swal from "sweetalert2";

export function showLoading(){
    Swal.fire({
        title: 'chargement...',
        background: '#FDFBF9',
        iconColor:"#ff6b6b",
        allowOutsideClick: false
    });
    Swal.showLoading(Swal.getDenyButton());
}