import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const useAdminData = () => {
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/admin"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return adminData;
};

const Admin = () => {
  const adminData = useAdminData();
  const {
    FRI_OPERATING_HOURS: operatingHours,
    FRI_OPERATING_HOURS_EXCLUSIONS: operatingHoursExclusions,
    FRI_APPOINTMENTS: appointments,
  } = adminData;
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h2">Admin Console</Typography>
      <Box sx={{ my: 4 }}>
        {!operatingHours || !operatingHoursExclusions || !appointments ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Typography>Operating Hours</Typography>
            <Table sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  {Object.keys(operatingHours[0])
                    .reverse()
                    .map((key) => (
                      <TableCell ket={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {operatingHours
                  .sort((a, b) => a.ID - b.ID)
                  .map((x) => (
                    <TableRow>
                      {Object.values(x)
                        .reverse()
                        .map((y) => (
                          <TableCell>{y}</TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography>Operating Hours Exclusions</Typography>
            <Table sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  {Object.keys(operatingHoursExclusions[0])
                    .reverse()
                    .map((key) => (
                      <TableCell ket={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {operatingHoursExclusions
                  .sort((a, b) => a.ID - b.ID)
                  .map((x) => (
                    <TableRow>
                      {Object.values(x)
                        .reverse()
                        .map((y) => (
                          <TableCell>{y}</TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography>Appointments</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(appointments[0])
                    .reverse()
                    .map((key) => (
                      <TableCell ket={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments
                  .sort((a, b) => a.ID - b.ID)
                  .map((x) => (
                    <TableRow>
                      {Object.values(x)
                        .reverse()
                        .map((y) => (
                          <TableCell>{y}</TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Admin;
