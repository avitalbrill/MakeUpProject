import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import meetStore from '../../makeUp/meet'
import { observer } from "mobx-react-lite";

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'serviceType', headerName: 'serviceType', width: 170 },
  { field: 'dateTime', headerName: 'dateTime', width: 250 },
  { field: 'clientName', headerName: 'clientName', width: 150, },
  {
    field: 'clientPhone', headerName: 'clientPhone', width: 230,
  },
  { field: 'clientEmail', headerName: 'clientEmail', width: 150 },
  {
    field: 'meetingStatus',
    headerName: 'Meeting Status',
    width: 120,
    renderCell: (params) => {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const meetingDate = new Date(params.row.dateTime).setHours(0, 0, 0, 0);

      if (meetingDate < currentDate) {
        return <div style={{ color: 'red' }}>PASS</div>;
      } else if (meetingDate === currentDate) {
        return <div style={{ color: 'green' }}>TODAY</div>;
      } else {
        return <div style={{ color: 'blue' }}>FUTURE</div>;
      }
    }
  }

];

const DataTable = observer(() => {

  console.log("initdata");
  const m = meetStore.getMeetings
  console.log("m", m);
  const rowsData = meetStore.getMeetings.map((i) => ({ ...i }));
  console.log("rows", rowsData);
       {rowsData.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))} 
  return (
    <div style={{ height: 400, width: 1200 }} >
      <DataGrid
        rows={rowsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },

        }}

        pageSizeOptions={[5, 10]}
      />
    </div>
  );

})
export default DataTable;
