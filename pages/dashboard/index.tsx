import { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown/Dropdown";
import InputDropdown from "@/components/inputdropdown/InputDropdown";

import mockData from "./mock.json";
import assigneeMockData from "./mockAssignee.json";

interface DropdownItem {
  id: number;
  title: string;
  color: string;
}

interface Assignee {
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

interface DashboardProps {
  data: DropdownItem[] | null;
  assigneeData: Assignee[] | null;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [data, setData] = useState<DropdownItem[] | null>(null);
  const [assigneeData, setAssigneeData] = useState<Assignee[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: DropdownItem[] = await mockData;
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAssigneeData = async () => {
      try {
        const result: Assignee[] = await assigneeMockData;
        setAssigneeData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchAssigneeData();
  }, []);

  return (
    <div>
      <Dropdown data={data} />
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <InputDropdown assigneeData={assigneeData} />
    </div>
  );
};

export default Dashboard;
