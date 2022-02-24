const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

const getDatMonthYear = (dateSting) => {
    const date = new Date(dateSting);

    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        yearDay: `${ date.getFullYear() }, ${ days[date.getDay()] }`
    }
};

export default getDatMonthYear;
