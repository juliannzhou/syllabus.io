import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // for selectable


function Schedule() {

    return (
        <FullCalendar
        editable
        droppable
        selectable={true}
        plugins={[interactionPlugin, dayGridPlugin]}
        initialView="dayGridWeek"
        />
    );
}

export default Schedule;