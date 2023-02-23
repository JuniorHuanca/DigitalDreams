// import React, { useState } from 'react';
// import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
// import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
// import Header from '@/components/Dashboard/Header';
// import { scheduleData } from '@/shared/util/data';



// type Props = {
//     children: JSX.Element
// }
// const PropertyPane = (props: Props) => <div className="mt-5">{props.children}</div>;

// const Calendar = () => {
//     const [scheduleObj, setScheduleObj] = useState({} as any);

//     const change = (args: any) => {
//         scheduleObj.selectedDate = args.value;
//         scheduleObj.dataBind();
//     };

//     const onDragStart = (arg: any) => {
//         // eslint-disable-next-line no-param-reassign
//         arg.navigation.enable = true;
//     };

//     return (
//         <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//             <Header title="CALENDAR" subtitle="Breakdown of Sales By Category" />

//             {/* <Header category="App" title="Calendar" /> */}
//             <ScheduleComponent
//                 height="650px"
//                 ref={(schedule: any) => setScheduleObj(schedule)}
//                 selectedDate={new Date(2021, 0, 10)}
//                 eventSettings={{ dataSource: scheduleData }}
//                 dragStart={onDragStart}
//             >
//                 <ViewsDirective>
//                     {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={(item) as any} />)}
//                 </ViewsDirective>
//                 <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
//             </ScheduleComponent>
//             <PropertyPane>
//                 <table
//                     style={{ width: '100%', background: 'white' }}
//                 >
//                     <tbody>
//                         <tr style={{ height: '50px' }}>
//                             <td style={{ width: '100%' }}>
//                                 <DatePickerComponent
//                                     value={new Date(2021, 0, 10)}
//                                     showClearButton={false}
//                                     placeholder="Current Date"
//                                     floatLabelType="Always"
//                                     change={change}
//                                 />
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </PropertyPane>
//         </div>
//     );
// };

// export default Calendar;
import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import Header from "@/components/Dashboard/Header";
import { ITheme } from "@/shared/util/types";
const Calendar = () => {
    const theme: ITheme = useTheme();
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected: any) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handleEventClick = (selected: any) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    return (
        <Box m="20px">
            <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR SIDEBAR */}
                <Box
                    flex="1 1 20%"
                    // backgroundColor={theme.palette.primary[400]}
                    p="15px"
                    borderRadius="4px"
                >
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {currentEvents.map((event: any) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    backgroundColor: theme.palette.secondary[500],
                                    margin: "10px 0",
                                    borderRadius: "2px",
                                }}
                            >
                                {/* <ListItemText
                                    primary={event.title}
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Typography>
                                    }
                                /> */}
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px">
                    {/* <FullCalendar
                        height="75vh"
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        eventsSet={(events: any) => setCurrentEvents(events)}
                        initialEvents={[
                            {
                                id: "12315",
                                title: "All-day event",
                                date: "2022-09-14",
                            },
                            {
                                id: "5123",
                                title: "Timed event",
                                date: "2022-09-28",
                            },
                        ]}
                    /> */}
                </Box>
            </Box>
        </Box>
    );
};

export default Calendar;
