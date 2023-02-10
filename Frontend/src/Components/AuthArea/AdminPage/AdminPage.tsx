import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CanvasJSReact from "../../../Assets/canvas/canvasjs.react";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import useVerifyTokenExpiry from "../../../Utils/useVerifyTokenExpiry";
import "./AdminPage.css";

function AdminPage(): JSX.Element {
  useVerifyTokenExpiry();
  useVerifyAdmin();

  const CanvasJsChart = CanvasJSReact.CanvasJSChart;
  const [followedVacation, setFollowedVacation] = useState<VacationModel[]>([]);
  const [followedDestination, setFollowedDestination] = useState<
    VacationModel[]
  >([]);
  const followedVacationsMapped: {}[] = [];
  const followedDestinationMapped: {}[] = [];

  useEffect(() => {
    vacationService
      .getVacationsFollowerCount()
      .then((vacations) => setFollowedVacation(vacations))
      .catch((err) => notifyService.error(err));

    vacationService
      .getDestinationFollowerCount()
      .then((vacations) => setFollowedDestination(vacations))
      .catch((err) => notifyService.error(err));
  }, []);

  if (followedVacation.length > 0) {
    followedVacation.map((v) => {
      if (v.followersCount > 0) {
        followedVacationsMapped.push({
          label: `${v.destinationName} From: ${v.startDate} To: ${v.endDate}`,
          y: v.followersCount,
        });
      }
    });
  }

  if (followedDestination.length > 0) {
    followedDestination.map((v) => {
      if (v.followersCount > 0) {
        followedDestinationMapped.push({
          label: `${v.destinationName}`,
          y: v.followersCount,
        });
      }
    });
  }

  const optionsVacations = {
    title: {
      text: "Vacations - Followers Graph",
    },
    data: [
      {
        type: "column",
        dataPoints: followedVacationsMapped,
      },
    ],
  };

  const optionsDestinations = {
    title: {
      text: "Destination - Followers Graph",
    },
    data: [
      {
        type: "column",
        dataPoints: followedDestinationMapped,
      },
    ],
  };
  return (
    <div className="AdminPage">
      <div className="charts">
        <div className="vacationsChart">
          <CanvasJsChart options={optionsVacations} />
        </div>
        <div className="destinationChart">
          <CanvasJsChart options={optionsDestinations} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
