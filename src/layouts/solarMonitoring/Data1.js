import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { useEffect, useState } from "react";

export default function data(dataApi) {
  let data = dataApi?.result_data?.pageList;

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   setData(dataApi);
  // }, [dataApi]);

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );
  const a1 = [1, 2, 3, 4];
  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Plant Name", accessor: "project", width: "30%", align: "left" },
      { Header: "Plant Type", accessor: "budget", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Real-Time Data", accessor: "completion", align: "center" },
      { Header: "Total Yield", accessor: "action", align: "center" },
    ],
    rows: data?.map((item) => ({
      project: <Project image={LogoAsana} name={item.ps_name} />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.ps_type === 1
            ? "Utility PV"
            : item.ps_type === 3
            ? "Commercial PV"
            : item.ps_type === 4
            ? "Residential PV"
            : item.ps_type === 5
            ? "Residential Storage"
            : item.ps_type === 6
            ? "Village-level Plant"
            : item.ps_type === 7
            ? "Distributed storage"
            : item.ps_type === 8
            ? "Poverty Reduction Plant"
            : item.ps_type === 9
            ? "Wind Plant"
            : "Unknown Type"}
        </MDTypography>
      ),
      status: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color={item.ps_status === 0 ? "error" : "success"}
          fontWeight="medium"
        >
          {item.ps_status === 0 ? "Offline" : "Online"}
        </MDTypography>
      ),
      completion: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.curr_power.value} {item.curr_power.unit}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.total_energy.value} {item.total_energy.unit}
        </MDTypography>
      ),
    })),
  };
}
